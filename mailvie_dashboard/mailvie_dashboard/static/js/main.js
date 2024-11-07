var timer_file_list;
$(document).ready(function () {
    $('.scroll-top').click(function () {
        $("html, body").animate({scrollTop: 0}, 1500);
        return false;
    });
    $('.js_api_signup_form .js_api_signup').click(function () {
        $('.alert-msg').html('');
        $('.js-alert-msg').removeClass('alert-danger');
        $('.js-alert-msg').addClass('collapse');
        
        $('.js_signup_loading').show();
        
        var data = new Object();
        data['action'] = $('.js_api_signup_form [name=action]').val();
        data['login'] = $('.js_api_signup_form [name=login]').val();
        data['password'] = $('.js_api_signup_form [name=password]').val();
        data['passwordconfirm'] = $('.js_api_signup_form [name=password2]').val();
        data['agree'] = $('.js_api_signup_form [name=agree]').val();
        
        var posting = $.post('/ajax/signup', data);
        posting.done(function (data_in) {
            $('.js_signup_loading').hide();
            //redirect to received url
            if (data_in.url != undefined) {
                window.location.href = data_in.url;
            }
            if (data_in.msgs != undefined && data_in.msgs[0].body !== null) {
                $('.alert-msg').html(data_in.msgs[0].body);
                $('.js-alert-msg').addClass('alert-danger');
                $('.js-alert-msg').removeClass('collapse');
            }
        });
    });
    $('.js_api_signin_form .js_api_signin').click(function () {
        $('.alert-msg').html('');
        $('.js-alert-msg').removeClass('alert-danger');
        $('.js-alert-msg').addClass('collapse');
        
        var data = new Object();
        data['action'] = $('.js_api_signin_form [name=action]').val();
        data['login'] = $('.js_api_signin_form [name=login]').val();
        data['password'] = $('.js_api_signin_form [name=password]').val();

        var posting = $.post('/ajax/signin', data);
        posting.done(function (data_in) {
            //redirect to received url
            if (data_in.url != undefined) {
                window.location.href = data_in.url;
            }
            if (data_in.msgs != undefined && data_in.msgs[0].body !== null) {
                $('.alert-msg').html(data_in.msgs[0].body);
                $('.js-alert-msg').addClass('alert-danger');
                $('.js-alert-msg').removeClass('collapse');
            }
        });
    });
    $('.js_api_logout').click(function () {
        var data = new Object();
        data['action'] = 'logout';
        send('/ajax/logout', data, function () {

        });
    });
    $('#alerts .js-close-alert').click(function () {
        $('.alert-msg').html('');
        $('.js-alert-msg').addClass('collapse');
        $('.js-alert-msg').removeClass('alert-danger');
    });
    $('.js_send_mail_confirm').click(function () {
        var data = new Object();
        send('/ajax/mail_confirm_send', data, function () {

        });
    });
    $('.js-use-promocode').click(function () {
        var slug = $('#promocode_slug').val();
        var order_id = parseInt($('#promocode_slug').attr('data-order-id'));
        apply_proofy_promocode(slug, order_id);
        return false;
    });

});
function delete_file_check(file_id) {
    if (confirm("Are you sure?")) {
        var data = new Object();
        data['file_id'] = file_id;
        send('/admin/delete_file_ajax', data, function () {
            $('[data-file-check-id=' + file_id + ']').hide();
        });
    }
}

function send(url, data, callback) {
    $(document).ready(function () {
        $.post(url, data, function (data_in) {
            data_in = jQuery.parseJSON(data_in);
            if (data_in.is_reload_page != null) {
                location.reload();
            }
            if (data_in.new_location != null && data_in.new_location.length > 0) {
                location = data_in.new_location;
            }
            if (data_in.msgs != null) {
                $.each(data_in.msgs, function (k, v) {
                    show_msg(v.body, v.type);
                });
            }
            callback(data_in);
        });
    });
}

//type 1-ok, 2-warning, 3-error
function show_msg(title, type, time) {
    $(document).ready(function () {
        class_name = 'alert-success';
        if (type == '1') {
            class_name = 'alert-success';
        }
        if (type == '2') {
            class_name = 'alert-warning';
        }
        if (type == '3') {
            class_name = 'alert-danger';
        }
        alarm = '<div class="b-left alert ' + class_name + ' js-alert-msg">' + title + '<img data-dismiss="alert" class="js-close-alert close animate" alt="close" src="/static/img/svg/close_light.svg"></div>';
        $('#alerts').append(alarm);
//        $('.alerts').append(alarm);
    });
}
$(document).ready(function () {
//----VALIDATION   
//    $(function () {
//        $(".form-block, .js-form-block").find("input,textarea,select").jqBootstrapValidation({
//            submitError: function ($form, event, errors) {
//                $('.form-block').removeClass('form-block-error');
//                $('.form-block').addClass('form-block-error');
//            },
//        });
//        $('input').focus(function () {
//            $('.form-block').removeClass('form-block-error');
//        });
//        $('.js_form_long_preloader').submit(function () {
//            $('.js_signup_before_loading_icon').hide();
//            $('.js_signup_loading').show();
//            //return false;
//        });
//    });
//----TOOLTIP
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

//----CUSTOM SELECT 
    $('.custom-select').selectpicker();
//----POPUP WINDOW
    $('.js-popup-init').click(function () {
        $('.js-window, .js-login-window').fadeIn(200);
    });
    $('.p-window').animate({"margin-top": "8%"}, 500, 'easeInQuart');
    $('.js-window-close, .js-close-login').click(function () {
        //$('.p-window').animate({ "margin-top": "-20%" }, 400, 'easeInQuart');
        $('.js-window').delay(0).fadeOut(100);
    });

//PRELOADER SHOWER ON SAVE
    $('.js-preloader').click(function () {
        $('.progress-indicator').show().delay(400).fadeOut(500);
    });
});

function open_add_limit_form() {
    $('.popup-api-limit-background').show();
    $popup = $('.popup-api-limit-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Add API limit for client');
    $popup.find('input[data-limit-popup-input="1"]').attr('placeholder', 'id');

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        var id = $(this).closest('.popup-api-limit-template').find('input[data-limit-popup-input="1"]').val();
        send_add_limit_form(id);
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
        location.reload();
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_add_limit_form(id) {
    $.post('/adm/api_limits_ajax', {'action': 'add_limit', 'id': id}, function (data_in) {
        return true;
    });
}

function open_update_limit_form(id) {
    $('.popup-api-limit-background').show();
    $popup = $('.popup-api-limit-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Update limit for #' + id);
    $popup.find('input[data-limit-popup-input="1"]').attr('placeholder', 'Limit');
    var limit = $('.row.js-user-id-' + id).find('.js-user-value span').text();
    $popup.find('input[data-limit-popup-input="1"]').attr('value', limit);

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        limit = $(this).closest('.popup-api-limit-template').find('input[data-limit-popup-input="1"]').val();
        send_update_limit_form(id, limit);
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
        $('.row.js-user-id-' + id).find('.js-user-value span').text(limit);
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_update_limit_form(id, limit) {
    $.post('/adm/api_limits_ajax', {'action': 'update_limit', 'id': id, 'limit': limit}, function (data_in) {
        return true;
    });
}

function open_remove_limit_form(id) {
    $('.popup-api-limit-background').show();
    $popup = $('.popup-api-limit-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Reset limit to 1 for #' + id + '?');
    $popup.find('input[data-limit-popup-input="1"]').parent().hide();

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        send_remove_limit_form(id);
        $popup.parent().find('.clonned').remove();
        $('.popup-api-limit-background').hide();
        $('.row.js-user-id-' + id).hide();
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_remove_limit_form(id) {
    $.post('/adm/api_limits_ajax', {'action': 'remove_limit', 'id': id}, function (data_in) {
        return true;
    });
}

function open_add_risky_form() {
    $('.popup-risky-domain-background').show();
    $popup = $('.popup-risky-domain-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Add risky domain(s)');
    $popup.find('textarea[data-limit-popup-input="1"]').attr('placeholder', 'domain');
    $popup.height('250px');

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-risky-domain-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        var domain = $(this).closest('.popup-risky-domain-template').find('textarea[data-limit-popup-input="1"]').val();
        send_add_risky_form(domain);
        setTimeout(function() {
            $popup.parent().find('.clonned').remove();
            $('.popup-risky-domain-background').hide();
            location.reload();
        }, 2000);
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_add_risky_form(domain) {
    $.post('/adm/risky_domains_ajax', {'action': 'add_domain', 'domain': domain}, function (data_in) {
        return true;
    });
}

function open_remove_risky_form(domain) {
    $('.popup-risky-domain-background').show();
    $popup = $('.popup-risky-domain-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Delete domain ' + domain + '?');
    $popup.find('textarea[data-limit-popup-input="1"]').parent().hide();

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-risky-domain-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        send_remove_risky_form(domain);
        setTimeout(function() {
            $popup.parent().find('.clonned').remove();
            $('.popup-risky-domain-background').hide();
            location.reload();
        }, 2000);
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_remove_risky_form(domain) {
    $.post('/adm/risky_domains_ajax', {'action': 'remove_domain', 'domain': domain}, function (data_in) {
        return true;
    });
}

function open_add_disposable_form() {
    $('.popup-disposable-domain-background').show();
    $popup = $('.popup-disposable-domain-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Add disposable domain(s)');
    $popup.find('textarea[data-limit-popup-input="1"]').attr('placeholder', 'domain');
    $popup.height('250px');

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-disposable-domain-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        var domain = $(this).closest('.popup-disposable-domain-template').find('textarea[data-limit-popup-input="1"]').val();
        send_add_disposable_form(domain);
        setTimeout(function() {
            $popup.parent().find('.clonned').remove();
            $('.popup-disposable-domain-background').hide();
            location.reload();
        }, 2000);
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_add_disposable_form(domain) {
    $.post('/adm/disposable_domains_ajax', {'action': 'add_domain', 'domain': domain}, function (data_in) {
        return true;
    });
}

function open_remove_disposable_form(domain) {
    $('.popup-disposable-domain-background').show();
    $popup = $('.popup-disposable-domain-template:not(.clonned)').clone(true);
    $popup.addClass('clonned');
    $popup.find('div[data-limit-popup-title="1"]').text('Delete domain ' + domain + '?');
    $popup.find('textarea[data-limit-popup-input="1"]').parent().hide();

    $popup.find('a[data-limit-popup-cancel="1"]').click(function () {
        $popup.parent().find('.clonned').remove();
        $('.popup-disposable-domain-background').hide();
    });
    $popup.find('button[data-limit-popup-accept="1"]').click(function () {
        send_remove_disposable_form(domain);
        setTimeout(function() {
            $popup.parent().find('.clonned').remove();
            $('.popup-disposable-domain-background').hide();
            location.reload();
        }, 2000);
    });

    $popup.appendTo('.container');
    $popup.show();
}
function send_remove_disposable_form(domain) {
    $.post('/adm/disposable_domains_ajax', {'action': 'remove_domain', 'domain': domain}, function (data_in) {
        return true;
    });
}

function apply_proofy_promocode(slug, order_id) {
    $.post('/admin/promocodes_ajax', {'action': 'apply_promocode', 'slug': slug, 'order_id': order_id}, function (data_in) {
        data_in = JSON.parse(data_in);
        if (data_in.result) {
            window.location.reload();
        } else {
            alert(data_in.message);
        }
        return true;
    });
}