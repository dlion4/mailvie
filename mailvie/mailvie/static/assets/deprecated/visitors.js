// Domain search form start

const domainExampleListener = () => $(".try-domain").click(function() {
  $("#domain-field").val($(this).text());
  return launchSearch();
});

const cleanDomainField = function() {
  const domain = App.hostnameFromURL($("#domain-field").val());
  $("#domain-field").val(domain);
  return domain;
};

const displayLoader = function() {
  const btn = $("#search-btn");
  const width = btn.outerWidth();
  btn.prop("disabled", true);
  btn.css("width", width + "px");
  btn.html("<span class='far fa-spinner-third fa-spin'></span>");
};

const hideLoader = function() {
  $("#search-btn").prop("disabled", false);
  return $("#search-btn").html(`<span class='ds-search__submit-text'>${i18n.t("js.front.domain_search.action.long")}</span>
                                <span class='ds-search__submit-icon far fa-search' aria-label="${i18n.t("js.front.domain_search.action.long")}"></span>`);
};

const displaySearchMessage = function(message) {
  $(".search-message .h-alert__content").html(message);
  return $(".search-message").removeClass("d-none");
};

const cleanSearch = function() {
  $(".ds-form__hint").hide();
  $(".ds-results").hide();
  $(".search-message").addClass("d-none");
  $(".search-message .h-alert__content").html("");
  $(".trial-error-message").hide().html("");
  $("#domain-logo").attr("src", "").addClass("d-none");
};

const loadResults = function(domain, token) {
  let trialResultsFrame = document.getElementById("trial-domain-search-results")

  trialResultsFrame.src = `/trial/v2/domain-search.html?domain=${domain}&token=${token}&locale=${i18n.locale}`
  trialResultsFrame.reload()

  // Add logo in search field
  $("#domain-logo").attr("src", `https://logo.clearbit.com/${domain}`).removeClass("d-none");

  // When the frame is loaded
  trialResultsFrame.loaded.then(function() {
    hideLoader();

    $(".results-container").slideDown();

    App.tooltip(".ds-results [data-bs-toggle='tooltip']");

    history.replaceState({}, `Hunter: ${domain}`, `/try/search/${domain}?locale=${i18n.locale}`);

    App.analytics.track("Front domain searches");
    App.analytics.ga_track("Homepage Domain Search", "Search");
  })
};


var launchSearch = function() {
  const domain = cleanDomainField();
  displayLoader();
  cleanSearch();
  configureAutoComplete();

  if (App.isADomainName(domain)) {
    if (App.user.id) { // If the user is connected
      window.location = `/search/${domain}`;
      return false;
    }

    $("html, body").animate({ scrollTop: $("#domain-search-form").offset().top - 120 }, 300);

    // The presence of this cookie is the sign that this user should most likely
    // be able to skip going through reCAPTCHA.
    if (App.readCookie("js_errors_cache_3")) {
      loadResults(domain, "verification_skipped");
      return false;
    }

    grecaptcha.execute(gon.recaptcha_site_key, { action: "domain_search" }).then(token => loadResults(domain, token));

  } else {
    hideLoader();
    displaySearchMessage(i18n.t("js.front.domain_search.not_a_domain_name_html"));
    domainExampleListener();
  }

  return false;
};


// Enables the autocomplete for the search field.
var configureAutoComplete = () => $("#domain-field").autocomplete({
  noCache: false,
  minChars: 3,
  preserveInput: true,
  triggerSelectOnValidInput: false,

  lookup(query, done) {
    const items = [];

    const input = App.hostnameFromURL(query);

    if (input === "") {
      return done({ suggestions: items });
    }

    return $.getJSON(App.api.domainsSuggestion(input), function(result) {
      result.data.forEach(function(item) {
        items.push({
          value: item.name,
          data: item.domain,
          logo: item.logo,
          email_count: item.email_count
        })
      });

      done({ suggestions: items });
    });
  },

  formatResult(suggestion, currentValue) {
    const dataHighlighted = suggestion.data.replace(currentValue.toLowerCase(), `<span class='suggestion-data-highlight'>${currentValue.toLowerCase()}</span>`);

    let emailsCountClass = "";
    if (suggestion.email_count > 0) {
      emailsCountClass = "results-found";
    }

    let numberOfResults = i18n.t("js.front.domain_autocomplete.results_count", { count: suggestion.email_count, results_count: i18n.numberToDelimited(suggestion.email_count, { separator: i18n.translations[i18n.locale].js.number.format.separator, delimiter: i18n.translations[i18n.locale].js.number.format.delimiter}) });

    let companyName = ""
    if (suggestion.value !== "") {
      companyName = suggestion.value
    }

    return `<span class="autocomplete-logo"><img src="${suggestion.logo}" onerror="this.src='/images/default_company_logo.svg'" /></span><span class="autocomplete-value">${companyName}</span><span class="autocomplete-data">${dataHighlighted}</span><span class="tag autocomplete-count ${emailsCountClass}">${numberOfResults}</span>`
  },

  onSelect(suggestion) {
    $("#domain-field").val(suggestion.data);
    $("#domain-search-form").submit();
    return $("#domain-field").autocomplete("destroy");
  }
});

document.addEventListener("turbo:load", function() {
  if (!App.currentPageIs("visitors", "homepage") && !App.currentPageIs("visitors", "domain_search")) { return; }

  // Click on domain example
  //
  domainExampleListener();

  // Launch the search from front pages on submit
  //
  $("#domain-search-form").submit(() => launchSearch());

  // Launch the autocomplete
  //
  return configureAutoComplete();
});

// Domain search form end

// Exit popup start

const addExtensionPopup = () => // Exit popup about the browser extension
//
// Conditions to appear :
// - Be on Chrome or Firefox
// - Be on the homepage, Verifier, Finder of search landing page
// - Not have already closed it
// - Not have the extension already installed
// - Not be logged in
//
setTimeout(function() {
  if (App.user.attributes.installed_chrome_extension !== true) {
    let cookies = JSON.parse(decodeURIComponent(App.readCookie("cookies_preferences")))
    let productAnalyticsCookiesAllowed = cookies?.product_analytics_cookies || true

    if (productAnalyticsCookiesAllowed) {
      return $(document).mousemove(function(e) {
        if (e.pageY <= 5) {
          if ((App.readCookie("extension_popup") !== "closed") && (typeof gon.user === "undefined")) {
            $("#extensionPopup").modal("show");
            return App.createCookie("extension_popup", "closed", 90);
          }
        }});
    }
  }
}, 10000);

document.addEventListener("turbo:load", function() {
  if (!App.currentPageIs("visitors", "homepage") && !App.currentPageIs("visitors", "domain_search") && !App.currentPageIs("visitors", "email_finder") && !App.currentPageIs("visitors", "email_verifier") && !App.currentPageIs("search_landing_page", "show")) { return; }

  // Show the exit popup to install the extension
  //
  if ((navigator.userAgent.toLowerCase().indexOf("chrome") > -1) || (navigator.userAgent.toLowerCase().indexOf("firefox") > -1)) {
   return addExtensionPopup();
 }
});

// Exit popup end

// About start

const drawAboutTimeline = () => $('.timeline-canvas').each(function() {
  if (this.getContext) {
    const ctx = this.getContext('2d');
    ctx.beginPath();
    ctx.arc(14,14,14,0,Math.PI*2,true); // Cercle exterieur
    ctx.rect(11,28,6,100);
    ctx.fillStyle = "#ddd";
    ctx.fill();
    return;
  }
});

document.addEventListener("turbo:load", function() {
  if (!App.currentPageIs("visitors", "about")) { return; }

  return drawAboutTimeline();
});

// About end

// API start

document.addEventListener("turbo:load", function() {
  if (!App.currentPageIs("visitors", "api")) { return; }

  return $(".api-features-nav-el").on("click", function() {
    $(".api-request").hide();
    $(`#${$(this).data("open")}`).show();
    $(".api-features-nav-el").removeClass("active");
    return $(this).addClass("active");
  });
});

// API end

// Email Finder start

App.FrontEmailFinder = function() {
  return {
    submit() {
      this.displayLoader();
      this.domain = $("#domain-field").val();
      this.full_name = $("#full-name-field").val();
      this.cleanFinderResults();

      // case when the rate limit is reached so the input is hidden
      if (!this.domain) {
        this.hideLoader();
        return false;
      }

      // Not correct domain -> STOP
      if ((this.domain.length < 4) || (this.domain.indexOf(".") === -1)) {
        this.displayFinderMessage(i18n.t("js.front.email_finder.not_correct_domain_name"));
        this.hideLoader();
        return false;
      }

      // Not a full name -> STOP
      if ((this.full_name.length < 5) || (this.full_name.indexOf(" ") === -1)) {
        this.displayFinderMessage(i18n.t("js.front.email_finder.not_a_full_name"));
        this.hideLoader();
        return false;
      }

      // Clean the domain
      this.domain = App.hostnameFromURL(this.domain);
      $("#domain-field").val(this.domain);

      if (App.user.id) { // If the user is connected
        window.location = `/find/${this.domain}/${this.full_name}`;
        return false;
      }

      // Initialize the Email Finder
      this.configureAutoComplete();

      // Send a page view to Google Analytics if it's a search (and not a direct link to the page)
      const newUrl = `/find/${this.domain}/${encodeURIComponent(this.full_name)}`;
      if (window.location.href.indexOf(this.domain) === -1) {
        App.analytics.sendPageview(`Email Finder (visitor): ${this.full_name} at ${this.domain}`, window.location.href, newUrl)
        App.analytics.posthog_capture("$pageview", { "$current_url": newUrl })
      }

      // Update the URL
      history.replaceState({}, `Hunter: ${this.domain} @ ${this.full_name}`, newUrl);

      // Scrollto form
      $("html, body").animate({ scrollTop: $("#finder-form").offset().top - 120 }, 300);

      this.executeRecaptcha();

      return false;
    },

    executeRecaptcha() {
      const _this = this;

      // The presence of this cookie is the sign that this user should most likely
      // be able to skip going through reCAPTCHA.
      if (App.readCookie("js_errors_cache_3")) {
        _this.token = "verification_skipped";
        _this.render(_this.domain, _this.full_name, "verification_skipped")
        return
      }

       grecaptcha.execute(gon.recaptcha_site_key, { action: "email_finder" }).then(function(token) {
        _this.token = token;
        _this.render(_this.domain, _this.full_name, _this.token)
      });
    },

    render(domain, full_name, token) {
      let _this = this
      let trialResultsFrame = document.getElementById("trial-email-finder-results")

      trialResultsFrame.src = `/trial/v2/email-finder.html?domain=${domain}&full_name=${full_name}&token=${token}&locale=${i18n.locale}`
      trialResultsFrame.reload()

      // When the frame is loaded
      trialResultsFrame.loaded.then(function() {
        _this.hideLoader();

        $(".finder-result-container").slideDown(200);

        App.tooltip(".finder-result-container [data-bs-toggle='tooltip']");
        App.popover("[data-bs-toggle='popover']");

        // Copy button function
        App.copyEmailListener();
      })
    },

    // Enables the autocomplete for the search field.
    configureAutoComplete() {

      return $("#domain-field").autocomplete({
        noCache: false,
        minChars: 3,
        preserveInput: true,

        lookup(query, done) {
          const items = [];

          const input = App.hostnameFromURL(query);

          if (input === "") {
            return done({ suggestions: items });
          }

          return $.getJSON(App.api.domainsSuggestion(input), function(result) {
            result.data.forEach(function(item) {
              items.push({
                value: item.name,
                data: item.domain,
                logo: item.logo
              })
            });

            done({ suggestions: items });
          });
        },

        formatResult(suggestion, currentValue) {
          // Highlight the string already typed.
          const dataHighlighted = suggestion.data.replace(currentValue.toLowerCase(), `<span class='suggestion-data-highlight'>${currentValue.toLowerCase()}</span>`);

          let companyName = ""
          if (suggestion.value !== "") {
            companyName = suggestion.value
          }

          return `<span class="autocomplete-logo"><img src="${suggestion.logo}" onerror="this.src='/images/default_company_logo.svg'" /></span><span class="autocomplete-value">${companyName}</span><span class="autocomplete-data">${dataHighlighted}</span>`
        },

        onSelect(suggestion) {
          $("#domain-field").val(suggestion.data);
          $("#domain-field").autocomplete("destroy");

          if ($("#domain-field").val().length && $("#full-name-field").val().length) {
            return $("#finder-form").trigger("submit");
          }
        }
      });
    },


    displayLoader() {
      const btn = $("#finder-btn");
      const width = btn.outerWidth();
      btn.prop("disabled", true);
      btn.css("width", width + "px");
      btn.html("<span class='far fa-spinner-third fa-spin'></span>");
    },


    hideLoader() {
      $("#finder-btn").prop("disabled", false);
      $("#finder-btn").html(`<span class='ds-search__submit-text'>${i18n.t("js.front.email_finder.cta")}</span>
                             <span class='ds-search__submit-icon far fa-search' aria-label="${i18n.t("js.front.email_finder.cta")}"></span>`);
    },


    displayFinderMessage(message) {
      $(".ds-form__hint").hide();
      $(".finder-message").removeClass("d-none");
      $(".finder-message .h-alert__content").html(message);
    },


    cleanFinderResults() {
      $(".finder-result-container").slideUp(300).html("");
      $(".finder-message").addClass("d-none");
      $(".trial-error-message").hide();
    }
  };
};


document.addEventListener("turbo:load", function() {
  let grecaptchaInterval;
  if (!App.currentPageIs("visitors", "email_finder")) { return; }

  return grecaptchaInterval = setInterval((function() {
    // Ensure reCaptcha is fully loaded before initializing the email finder
    //
    if (window.grecaptcha) {
      grecaptcha.ready(function() {
        const emailFinder = new App.FrontEmailFinder;
        emailFinder.configureAutoComplete();

        $(".try-email-finder").on("click", function(){
          $("#domain-field").val($(this).attr("data-domain"));
          $("#full-name-field").val($(this).attr("data-name"));
          emailFinder.submit();
        })

        if ($("#domain-field").length && $("#domain-field").val().length && $("#full-name-field").length && $("#full-name-field").val().length) {
          emailFinder.submit();
        }

        return $("#finder-form").on("submit", function(e) {
          e.preventDefault();
          emailFinder.submit();
        })
      });

      clearInterval(grecaptchaInterval);
    }
  }), 100);
});

// Email Finder end

// Email Verifier start

App.FrontEmailVerifier = function() {
  return {
    submit() {
      this.displayLoader();
      this.cleanResults();

      this.email = $("#email-verifier-form #email-field").val();
      this.domain = this.email.split("@")[1];
      $("#email-verifier-form #email-field").val("").val(this.email); // Remove the whitespaces

      if (App.user.id) { // If the user is connected
        window.location = `/verify/${this.email}`;
        return false;
      }

      // Send pageview to Google Analytics if it's a search (and not a direct link to the page)
      if (window.location.href.indexOf(encodeURIComponent(this.email)) === -1) {
        App.analytics.sendPageview(`Email Verifier (visitor): ${this.email}`, window.location.href, window.location.pathname)
        App.analytics.posthog_capture("$pageview", { "$current_url": window.location.href })
      }

      // Updates the URL from "/email-verifier" to "/verify/{email}" if needed
      if (window.location.href.indexOf(this.email) === -1) {
        history.replaceState({}, `Hunter: ${this.email}`, `/verify/${this.email}`);
      }

      // Scrollto form
      $("html, body").animate({ scrollTop: $("#email-verifier-form").offset().top - 120 }, 300);

      this.executeRecaptcha();
      return false;
    },

    executeRecaptcha() {
      const _this = this;

      if (App.readCookie("js_errors_cache_3")) {
        _this.token = "verification_skipped";
        _this.checkIfDisposable();
        return false;
      }

      grecaptcha.execute(gon.recaptcha_site_key, { action: "email_verifier" }).then(function(token) {
        _this.token = token;
        _this.checkIfDisposable();
      });
    },

    checkIfDisposable() {
      const _this = this;

      return $.ajax({
        url: `https://velen.hunter.io/minimal-domain-info?domain=${_this.domain}`,
        type: "GET",
        data: { format: "json" },
        error(xhr, statusText, err) {
          App.analytics.track("Front email verifications");
          _this.render(_this.email, _this.token)
        },
        success(result, statusText, xhr) {
          if (result.disposable) {
            _this.hideLoader();
            _this.displayMessage(i18n.t("js.front.email_verifier.disposable_address"));
          } else {
            App.analytics.track("Front email verifications");
            _this.render(_this.email, _this.token)
          }
        }
      });
    },

    render(email, token) {
      let _this = this
      let trialResultsFrame = document.getElementById("trial-email-verifier-results")
      let domainName = email.split("@")[1];

      trialResultsFrame.src = `/trial/v2/email-verifier.html?email=${encodeURIComponent(email)}&token=${token}&locale=${i18n.locale}`
      trialResultsFrame.reload()

      // When the frame is loaded
      trialResultsFrame.loaded.then(function() {
        _this.hideLoader();

        $(".verify-result").slideDown(300);

        App.tooltip(".verify-result [data-bs-toggle='tooltip']")
        App.popover("[data-bs-toggle='popover']");

        _this.emailAddressesCount(domainName);
      })
    },

    emailAddressesCount(domain) {
      let emailCount = document.getElementById("email-count")

      if (emailCount === null) {
        // Return prematurely if the email count element is not present on the page.
        return;
      }

      let emailCountTitle = document.getElementById("email-count-title")
      let emailCountLink = document.getElementById("email-count-url")

      fetch(App.api.emailCount(domain, null), {
        credentials: "same-origin",
        headers: {
          "Accept": "application/json",
          "Email-Hunter-Origin": "website_dashboard"
        }
      })
      .then(response => response.json().then(json => {
        let totalEmails = json.data.total

        if (totalEmails >= 1) {
          emailCount.classList.remove("d-none")
          emailCountTitle.innerHTML = i18n.t("js.front.email_verifier.email_count_results_title", { count: totalEmails, results_count: i18n.numberToDelimited(totalEmails, { separator: i18n.translations[i18n.locale].js.number.format.separator, delimiter: i18n.translations[i18n.locale].js.number.format.delimiter}), domain: domain })
          emailCountLink.href = `/search/${domain}`
          emailCountLink.textContent = i18n.t("js.front.email_verifier.email_count_results_link")
        }
      }))
    },

    cleanResults() {
      $(".ds-form__hint").hide();
      $(".verifier-message").addClass("d-none");
      $(".verify-result").slideUp(300);
      $("#email-count").hide();
    },

    displayLoader() {
      const btn = $("#search-btn");
      const width = btn.outerWidth();
      btn.prop("disabled", true);
      btn.css("width", width + "px");
      btn.html("<span class='far fa-spinner-third fa-spin'></span>");
      $(".verifier-message").removeClass("d-none")
      $(".verifier-message .h-alert__content").text(i18n.t("js.front.email_verifier.verifying"));
    },

    hideLoader() {
      $("#search-btn").prop("disabled", false);
      $("#search-btn").text(i18n.t("js.front.email_verifier.verify"));
    },

    displayMessage(message) {
      $(".verifier-message").removeClass("d-none");
      $(".verifier-message .h-alert__content").html(message)
    }
  };
};


document.addEventListener("turbo:load", function() {
  let grecaptchaInterval;

  if (!App.currentPageIs("visitors", "email_verifier")) { return; }

  return grecaptchaInterval = setInterval((function() {
    // Ensure reCaptcha is fully loaded before initializing the email verifier
    //
    if (window.grecaptcha) {
      grecaptcha.ready(function() {
        const emailVerifier = new App.FrontEmailVerifier;

        $(".try-email-verifier").on("click", function(){
          $("#email-field").val($(this).attr("data-email"));
          emailVerifier.submit();
        })

        // Immediately perform a verification if an email is present
        //
        if ($("#email-verifier-form #email-field").val() && ($("#email-verifier-form #email-field").val().length > 6)) {
          emailVerifier.submit();
        }

        $("#email-verifier-form").on("submit", function(e) {
          e.preventDefault();
          emailVerifier.submit();
        });

        // Prevent user from being able to add spaces in his search
        //
        return $("#email-verifier-form #email-field").keypress(function(e) {
          if (e.which === 32) { return false; }
        });
      });

      clearInterval(grecaptchaInterval);
    }
  }), 100);
});

// Email Verifier end;
