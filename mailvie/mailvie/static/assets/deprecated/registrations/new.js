App.SignupForm = function() {
  return {
    checkSignupEmail() {
      $("#signup-email-button").html(`<div class='far fa-spinner-third fa-spin'></div> ${i18n.t("js.devise.registration.new.loading")}`).prop("disabled", true);

      const _this = this;
      const inviteLink = $("#invite_link").val();
      const invite = $("#invite").val();

      return $.ajax({
        url: `/users/pre-registrations/check-email?email=${encodeURIComponent($("#email-signup-field").val())}&invite_link=${inviteLink}&invite=${invite}`,
        type: "GET",
        data: { format: "json" },
        dataType: "json",
        success(response) {
          if (!response.data.team_invite_domain) {
            _this.displaySignupEmailMessage("danger", "fa-circle-xmark", i18n.t("js.devise.registration.new.team_invite_domain_mismatch_html", { domain: response.data.team_invite_domain_name }));
            return _this.hideEmailCheckLoader();
          } else if (response.data.webmail && !response.data.premium_invite_pending) {
            if (response.data.forbidden_webmail) {
              _this.displaySignupEmailMessage("danger", "fa-circle-xmark", i18n.t("js.devise.registration.new.forbidden_webmail_html"));
              return _this.hideEmailCheckLoader();
            } else {
              _this.displaySignupEmailMessage("warning", "fa-triangle-exclamation", i18n.t("js.devise.registration.new.warning_email_html", { example: $("#email-signup-field").val().split("@")[1] }));
              _this.hideEmailCheckLoader();
              return _this.allowSignupWithAnyAddress();
            }
          } else if (response.data.disposable) {
            _this.displaySignupEmailMessage("danger", "fa-circle-xmark", i18n.t("js.devise.registration.new.disposable_email_address_html"));
            return _this.hideEmailCheckLoader();
          } else {
            return _this.openStepTwo();
          }
        },

        error() {
          _this.displaySignupEmailMessage("danger", "fa-circle-xmark", i18n.t("js.devise.registration.new.invalid_email_address_html"));
          _this.hideEmailCheckLoader();
          return _this.allowSignupWithAnyAddress();
        }
      });
    },

    displaySignupEmailMessage(type, icon, html) {
      $("#signup-email-message").html(`<div class="h-alert h-alert--${type} mb-4">
                                       <div class="h-alert__icon-wrapper"><span class="h-alert__icon far ${icon}"></span></div>
                                       <div class="h-alert__content"><div class="h-alert__description">${html}</div></div></div>`);
      return $("#signup-email-message").slideDown(200);
    },

    hideSignupEmailMessage() {
      return $("#signup-email-message").slideUp(200, () => $("#signup-email-message").html(""));
    },

    listenToGoogleSignup() {
      // Appends the tracking parameters if part of the URL
      let signupParams = new URLSearchParams(location.search);
      let destinationParams = new URLSearchParams({});

      ["invite", "invite_link", "level", "upgrade_after_signup", "utm_campaign", "utm_medium", "from"].forEach((param) => {
        if (signupParams.get(param) !== null) {
          destinationParams.set(param, signupParams.get(param));
        }
      });

      return App.oauthConnect(".btn-google", `/auth/google?${destinationParams.toString()}`);
    },

    openStepOne() {
      return $("#sign-up-step-2").fadeOut(() => $("#sign-up-step-1").fadeIn());
    },

    openStepTwo() {
      const _this = this;

      _this.savePreregisteredEmail($("#email-signup-field").val());

      return $("#sign-up-step-1").fadeOut(function() {
        $("#sign-up-step-2").fadeIn(() => _this.hideEmailCheckLoader());

        $("#first-name-field").focus();
        history.pushState(null, i18n.t("js.devise.registration.new.meta_title_html"));

        return $("#email-field").val($("#email-signup-field").val());
      });
    },

    hideEmailCheckLoader() {
      $(".go-to-step2").off("click.gotostep2")
      $("#signup-email-button").removeClass("go-to-step2")
      return $("#signup-email-button").text(i18n.t("js.devise.registration.new.continue")).prop("disabled", false);
    },

    allowSignupWithAnyAddress() {
      const _this = this;

      $("#signup-email-button").addClass("go-to-step2");

      $(".go-to-step2").on("click.gotostep2", function() {
        _this.openStepTwo();
      });

      return $("#signup-email-button").text(i18n.t("js.devise.registration.new.continue_with_email_address")).prop("disabled", false);
    },

    savePreregisteredEmail(email) {
      return $.ajax({
        url: "/users/pre-registrations/save-email",
        type: "POST",
        headers: { "X-CSRF-Token": $("meta[name='csrf-token']").attr("content") },
        dataType: "json",
        data: { user: { email } }
      });
    }
  };
};


document.addEventListener("turbo:load", function() {
  if (!App.currentPageIs("registrations", "new")) { return; }

  App.signupForm = new App.SignupForm;

  // Google Signup
  App.signupForm.listenToGoogleSignup();

  // Automatically check the email when it can be found in the query params
  if ($("#email-signup-field").val()) {
    App.signupForm.checkSignupEmail();
  }

  // Email Signup
  $("#email-signup-form").on("submit", function() {
    App.signupForm.checkSignupEmail();
    return false;
  });

  $("#email-signup-field").keyup(function(e) {
    if (e.which !== 13) {
      App.signupForm.hideEmailCheckLoader();
      App.signupForm.hideSignupEmailMessage();
    }
  });

  history.replaceState(null, "Sign up • Hunter");
  return window.onpopstate = function() {
    if ($("#sign-up-step-2").is(":visible")) {
      return App.signupForm.openStepOne();
    }
  };
});
