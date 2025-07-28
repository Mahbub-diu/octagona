!(function ($) {
  $(document).ready(function () {
    // $('.popup_custom_video').magnificPopup({
    // 	disableOn: 700,
    // 	type: 'iframe',
    // 	mainClass: 'mfp-fade',
    // 	removalDelay: 160,
    // 	preloader: false,
    // 	fixedContentPos: false
    // });
    $('.popup_custom_video').magnificPopup({
      type: 'iframe',
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '</div>',

        patterns: {
          youtube: {
            index: 'youtube.com/',

            id: 'v=',

            src: 'https://www.youtube.com/embed/%id%?autoplay=1',
          },
          vimeo: {
            index: 'vimeo.com/',
            id: '/',
            src: '//player.vimeo.com/video/%id%?autoplay=1',
          },
          gmaps: {
            index: '//maps.google.',
            src: '%id%&output=embed',
          },
        },

        srcAction: 'iframe_src',
      },
    });

    // $('.popup_custom_video').magnificPopup({
    //     disableOn: 700,
    //     type: 'iframe',
    //     mainClass: 'mfp-fade',
    //     removalDelay: 160,
    //     preloader: false,
    //     fixedContentPos: false,
    //     callbacks: {
    //         beforeOpen: function() {
    //             var src = this.st.el.attr('href');
    //             // Ensure the URL is HTTPS
    //             this.st.iframe.src = src.replace("http://", "https://");
    //         }
    //     }
    // });

    $('.oc_profile_creation_btn').click(function () {
      $('.oc_profile_creation_btn').hide();
      $('#oc_cs_btn_dgn_load').prop('disabled', true);
      $('#oc_cs_btn_dgn_load').show();
      setInterval(function () {
        $('.oc_profile_creation_btn').show();
        $('#oc_cs_btn_dgn_load').prop('disabled', false);
        $('#oc_cs_btn_dgn_load').hide();
      }, 10000);
    });

    $('#oc_rc_btn_dgn').click(function () {
      $('#oc_rc_btn_dgn').hide();
      $('#oc_rc_btn_dgn_load').prop('disabled', true);
      $('#oc_rc_btn_dgn_load').show();
    });

    function contact_form_validation(nome, cognome, telefono, email) {
      var currentURL = window.location.href;
      if (currentURL.includes('/en/')) {
        var name_error = 'Name is required.';
        var cognome_error = 'Surename is required.';
        var telefono_error = 'Phone No is required.';
        var email_error = 'Email is required.';
      } else {
        var name_error = 'Nome is required.';
        var cognome_error = 'Cognome is required.';
        var telefono_error = 'Telefono is required.';
        var email_error = 'Email is required.';
      }
      $('.name_error').text('');
      $('.cognome_error').text('');
      $('.telefono_error').text('');
      $('.emaile_error').text('');
      let error = false;
      if (nome == '' || nome == undefined) {
        $('.name_error').text(name_error);
        error = true;
      }
      if (cognome == '' || cognome == undefined) {
        $('.cognome_error').text(cognome_error);
        error = true;
      }
      if (telefono == '' || telefono == undefined) {
        $('.telefono_error').text(telefono_error);
        error = true;
      }
      if (email == '' || email == undefined) {
        $('.email_error').text(email_error);
        error = true;
      }
      return error;
    }
    $('#con_rc_btn_dgn_btn').click(function () {
      let nome = $('#name').val();
      let cognome = $('#cognome').val();
      let telefono = $('#telefono').val();
      let email = $('#email').val();
      let ruolo = $('#ruolo').val();
      let azienda = $('#azienda').val();
      let messaggio = $('#messaggio').val();
      let mail_to = $('#mail_to').val();
      let voglio_ricevere = 0;
      let voglio_ricevere_two = 0;

      if ($('#voglio_ricevere').prop('checked') == true) {
        voglio_ricevere = 1;
      }
      if ($('#voglio_ricevere_two').prop('checked') == true) {
        voglio_ricevere_two = 1;
      }
      let check_validate = contact_form_validation(
        nome,
        cognome,
        telefono,
        email
      );
      if (check_validate) {
        return false;
      }
      const url = action_url_ajax.ajax_url;
      $('#con_rc_btn_dgn_btn').hide();
      $('#oc_con_btn_dgn_load').prop('disabled', true);
      $('#oc_con_btn_dgn_load').show();
      $.ajax({
        url: url,
        data: {
          action: 'octgn_common_form_action_mail_sending',
          nome: nome,
          cognome: cognome,
          telefono: telefono,
          email: email,
          ruolo: ruolo,
          azienda: azienda,
          messaggio: messaggio,
          voglio_ricevere: voglio_ricevere,
          voglio_ricevere_two: voglio_ricevere_two,
          mail_to: mail_to,
        },
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
          console.log(data);
          if (data.error == true) {
            alert(data.message);
            $('#con_rc_btn_dgn_btn').show();
            $('#oc_con_btn_dgn_load').prop('disabled', false);
            $('#oc_con_btn_dgn_load').hide();
          } else {
            window.location.href = data.redirect_url;
          }
        },
      });
    });

    // start landing page form

    function landing_form_validation(nome, cognome, email) {
      var currentURL = window.location.href;
      if (currentURL.includes('/en/')) {
        var name_error = 'Name is required.';
        var cognome_error = 'Surename is required.';
        var email_error = 'Email is required.';
      } else {
        var name_error = 'Nome is required.';
        var cognome_error = 'Cognome is required.';
        var email_error = 'Email is required.';
      }
      $('.name_error').text('');
      $('.cognome_error').text('');
      $('.emaile_error').text('');
      let error = false;
      if (nome == '' || nome == undefined) {
        $('.name_error').text(name_error);
        error = true;
      }
      if (cognome == '' || cognome == undefined) {
        $('.cognome_error').text(cognome_error);
        error = true;
      }
      if (email == '' || email == undefined) {
        $('.email_error').text(email_error);
        error = true;
      }
      return error;
    }
    $('#landing_form_sbmt_btn').click(function () {
      let nome = $('#name').val();
      let cognome = $('#cognome').val();
      let email = $('#email').val();
      let mail_to = $('#mail_to').val();
      let voglio_ricevere = 0;
      let voglio_ricevere_two = 0;

      if ($('#voglio_ricevere').prop('checked') == true) {
        voglio_ricevere = 1;
      }
      if ($('#voglio_ricevere_two').prop('checked') == true) {
        voglio_ricevere_two = 1;
      }
      let check_validate = landing_form_validation(nome, cognome, email);
      if (check_validate) {
        return false;
      }
      const url = action_url_ajax.ajax_url;
      $('#landing_form_sbmt_btn').hide();
      $('#oc_con_btn_dgn_load').prop('disabled', true);
      $('#oc_con_btn_dgn_load').show();
      $.ajax({
        url: url,
        data: {
          action: 'octgn_landing_form_action_mail_sending',
          nome: nome,
          cognome: cognome,
          email: email,
          voglio_ricevere: voglio_ricevere,
          voglio_ricevere_two: voglio_ricevere_two,
          mail_to: mail_to,
        },
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
          console.log(data);
          if (data.error == true) {
            alert(data.message);
            $('#landing_form_sbmt_btn').show();
            $('#oc_con_btn_dgn_load').prop('disabled', false);
            $('#oc_con_btn_dgn_load').hide();
          } else {
            window.location.href = data.redirect_url;
          }
        },
      });
    });

    // end landing page form

    $('.mobile_menu').slicknav({
      label: '',
      appendTo: '.octgn_mobile_menu',
      easingOpen: 'swing',
    }),
      $(window).scroll(function () {
        $(window).scrollTop() > 80
          ? ($('.oct_home_fix_menu').css({
              background: '#fff',
              transition: '.7s',
              padding: '15px 0px',
            }),
            $('.oct_home_fix_menu .menu_items ul li a').css({ color: '#000' }),
            $('.h_hmw_logo').css({
              opacity: 0,
              visibility: 'hidden',
              height: 0,
            }),
            $('.h_hmn_logo').css({
              opacity: 1,
              visibility: 'visible',
              height: 'auto',
            }))
          : ($('.h_hmw_logo').css({
              opacity: 1,
              visibility: 'visible',
              height: 'auto',
            }),
            $('.h_hmn_logo').css({
              opacity: 0,
              visibility: 'hidden',
              height: 0,
            }),
            $('.oct_home_fix_menu').css({
              background: 'transparent',
              transition: '.7s',
              padding: '25px 0px',
            }),
            $('.oct_home_fix_menu .menu_items ul li a').css({ color: '#fff' }));
      }),
      $('.h_hm_hero_slider').owlCarousel({
        animateOut: 'animate__fadeOut',
        animateIn: 'animate__fadeIn',
        smartSpeed: 450,
        items: 1,
        nav: !1,
        loop: !0,
        autoplay: !0,
        dots: !0,
        dotsData: !0,
        smartSpeed: 1e3,
      }),
      $('.social_items ul li:nth-child(1) a').on('click', function (a) {
        a.preventDefault(), $('.header_search_form').slideToggle();
      }),
      $('.h_hm_logo_slider').owlCarousel({
        loop: !0,
        autoplay: !0,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          800: { items: 3 },
          1e3: { items: 4 },
          1200: { items: 5 },
          1400: { items: 7 },
        },
      }),
      $('.h_csm_single_team_member_info a').on('click', function (a) {
        a.preventDefault();
      }),
      $('.contatti_btm_sadi_slider').owlCarousel({
        loop: !0,
        autoplay: !0,
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          800: { items: 1 },
          1e3: { items: 2 },
          1200: { items: 3 },
          1400: { items: 3 },
        },
      }),
      $('#octgn_cv_submit_form').validate({
        rules: {
          type_name: { required: !0 },
          cognome: { required: !0 },
          telefono: { required: !0, number: !0 },
          email: { required: !0, email: !0 },
          message: { required: !0 },
          octagona_file: { required: !0 },
          voglio_ricevere_two: { required: !0 },
        },
        submitHandler: function (a) {
          _iub.cons_instructions.push([
            'submit',
            {
              writeOnLocalStorage: !1,
              form: {
                selector: document.getElementById('octgn_cv_submit_form'),
                map: {
                  subject: {
                    first_name: 'type_name',
                    last_name: 'cognome',
                    email: 'email',
                  },
                  preferences: { telefono: 'telefono', message: 'message' },
                },
              },
              consent: {
                legal_notices: [
                  { identifier: 'privacy_policy' },
                  { identifier: 'cookie_policy' },
                  { identifier: 'term' },
                ],
              },
            },
            {
              success: function (a) {
                console.log(a);
              },
              error: function (a) {
                console.log(a);
              },
            },
          ]),
            a.submit();
        },
      }),
      // $("#octgn_comn_form").validate({
      //     rules: { name: { required: !0 }, cognome: { required: !0 }, telefono: { required: !0, number: !0 }, email: { required: !0, email: !0 }, messaggio: { required: !0 }, voglio_ricevere_two: { required: !0 } },
      //     submitHandler: function (a) {
      //         _iub.cons_instructions.push([
      //             "submit",
      //             {
      //                 writeOnLocalStorage: !1,
      //                 form: {
      //                     selector: document.getElementById("octgn_common_form"),
      //                     map: {
      //                         subject: { first_name: "name", last_name: "cognome", email: "email" },
      //                         preferences: { ruolo: "ruolo", azienda: "azienda", telefono: "telefono", messaggio: "messaggio", voglio_ricevere: "voglio_ricevere", voglio_ricevere_two: "voglio_ricevere_two" },
      //                     },
      //                 },
      //                 consent: { legal_notices: [{ identifier: "privacy_policy" }, { identifier: "cookie_policy" }, { identifier: "term" }] },
      //             },
      //             {
      //                 success: function (a) {
      //                     console.log(a);
      //                 },
      //                 error: function (a) {
      //                     console.log(a);
      //                 },
      //             },
      //         ]),
      //             a.submit();
      //     },
      // }),

      $('#octgn_newsletter_form').validate({
        rules: {
          type_name: { required: !0 },
          cognome: { required: !0 },
          email: { required: !0, email: !0 },
          Acconsento_dei: { required: !0 },
        },
        submitHandler: function (a) {
          _iub.cons_instructions.push([
            'submit',
            {
              writeOnLocalStorage: !1,
              form: {
                selector: document.getElementById('octgn_newsletter_form'),
                map: {
                  subject: {
                    first_name: 'type_name',
                    last_name: 'cognome',
                    email: 'email',
                  },
                  preferences: { Acconsento_dei: 'Acconsento_dei' },
                },
              },
              consent: {
                legal_notices: [
                  { identifier: 'privacy_policy' },
                  { identifier: 'cookie_policy' },
                  { identifier: 'term' },
                ],
              },
            },
            {
              success: function (a) {
                console.log(a);
              },
              error: function (a) {
                console.log(a);
              },
            },
          ]),
            a.submit();
        },
      }),
      $('#octgn_profile_processing_form').validate({
        rules: {
          type_name: { required: !0 },
          cognome: { required: !0 },
          telefono: { required: !0, number: !0 },
          email: { required: !0, email: !0 },
          voglio_ricevere_two: { required: !0 },
        },
        submitHandler: function (a) {
          _iub.cons_instructions.push([
            'submit',
            {
              writeOnLocalStorage: !1,
              form: {
                selector: document.getElementById(
                  'octgn_profile_processing_form'
                ),
                map: {
                  subject: {
                    first_name: 'name',
                    last_name: 'cognome',
                    email: 'email',
                  },
                  preferences: {
                    telefono: 'telefono',
                    voglio_ricevere_two: 'voglio_ricevere_two',
                  },
                },
              },
              consent: {
                legal_notices: [
                  { identifier: 'privacy_policy' },
                  { identifier: 'cookie_policy' },
                  { identifier: 'term' },
                ],
              },
            },
            {
              success: function (a) {
                console.log(a);
              },
              error: function (a) {
                console.log(a);
              },
            },
          ]),
            a.submit();
        },
      }),
      $('#profile_creation_btn').prop('disabled', !0),
      $('.h_csm_contact_form_checkbox_input input:checkbox').click(function () {
        $(this).is(':checked')
          ? $('#profile_creation_btn').prop('disabled', !1)
          : $('.is_checked_buser').filter(':checked').length < 1 &&
            $('#profile_creation_btn').attr('disabled', !0);
      }),
      [].slice
        .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .map(function (a) {
          return new bootstrap.Tooltip(a);
        });

    /**
     * Start PDF sending form
     */

    function pdf_form_validation_cog(nome, cognome, telefono, email) {
      var currentURL = window.location.href;
      if (currentURL.includes('/en/')) {
        var name_error = 'Name is required.';
        var cognome_error = 'Surename is required.';
        var telefono_error = 'Phone No is required.';
        var email_error = 'Email is required.';
      } else {
        var name_error = 'Nome is required.';
        var cognome_error = 'Cognome is required.';
        var telefono_error = 'Telefono is required.';
        var email_error = 'Email is required.';
      }

      $('.nome_error').text('');
      $('.cognome_error').text('');
      $('.telefono_error').text('');
      $('.email_error').text('');

      let error = false;

      if (nome == '' || nome == undefined) {
        $('.nome_error').text(name_error);
        error = true;
      }

      if (cognome == '' || cognome == undefined) {
        $('.cognome_error').text(cognome_error);
        error = true;
      }

      if (telefono == '' || telefono == undefined) {
        $('.telefono_error').text(telefono_error);
        error = true;
      }

      if (email == '' || email == undefined) {
        $('.email_error').text(email_error);
        error = true;
      }
      return error;
    }

    $('#pdf_submit_ptn_cog').on('click', function (e) {
      e.preventDefault();
      let url = action_url_ajax.ajax_url;

      var nome = $('#nome').val();
      var cognome = $('#cognome').val();
      var telefono = $('#telefono').val();
      var email = $('#email').val();
      var is_en = $('#is_en').val();

      var mail_to = $('#mail_to').val();

      let profile_one = 0;
      if ($('#octagona_profile_one').prop('checked') == true) {
        profile_one = 1;
      }

      let profile_two = 0;
      if ($('#octagona_profile_two').prop('checked') == true) {
        profile_two = 1;
      }

      let profile_three = 0;
      if ($('#octagona_profile_three').prop('checked') == true) {
        profile_three = 1;
      }

      let profile_four = 0;
      if ($('#octagona_profile_four').prop('checked') == true) {
        profile_four = 1;
      }

      let voglio_ricevere = 0;
      let voglio_ricevere_two = 0;

      if ($('#voglio_ricevere').prop('checked') == true) {
        voglio_ricevere = 1;
      }
      if ($('#voglio_ricevere_two').prop('checked') == true) {
        voglio_ricevere_two = 1;
      }

      let check_pdf_validation = pdf_form_validation_cog(
        nome,
        cognome,
        telefono,
        email
      );
      if (check_pdf_validation) {
        return;
      }
      // console.log('fgfh');
      //             return;

      $('#pdf_submit_ptn_cog').hide();
      $('#pdf_submit_ptn_cog').prop('disabled', true);
      $('button#oc_cs_btn_dgn_load').show();
      $.ajax({
        url: url,
        data: {
          action: 'pdf_sending_form_action',
          nome: nome,
          cognome: cognome,
          telefono: telefono,
          email: email,
          profile_one: profile_one,
          profile_two: profile_two,
          profile_three: profile_three,
          profile_four: profile_four,
          ricevere_one: voglio_ricevere,
          ricevere_two: voglio_ricevere_two,
          is_en: is_en,
          mail_to: mail_to,
        },
        type: 'post',
        dataType: 'JSON',
        success: function (data) {
          // if (data.error == false) {
          $('.final_mmsg').css({ display: 'block' });
          $('.final_mmsg p').html(data.message);

          $('#pdf_submit_ptn_cog').show();
          $('#pdf_submit_ptn_cog').prop('disabled', false);
          $('button#oc_cs_btn_dgn_load').hide();

          setTimeout(function () {
            $('.final_mmsg').css({ display: 'none' });
          }, 2000);
          // }
        },
      });
    });

    function pdf_form_validation(nome, azienda, telefono, email) {
      var currentURL = window.location.href;
      if (currentURL.includes('/en/')) {
        var name_error = 'Name is required.';
        // var cognome_error = 'Surename is required.';
        var azienda_error = 'Azienda is required.';
        var telefono_error = 'Phone No is required.';
        var email_error = 'Email is required.';
      } else {
        var name_error = 'Nome is required.';
        // var cognome_error = 'Cognome is required.';
        var azienda_error = 'Azienda is required.';
        var telefono_error = 'Telefono is required.';
        var email_error = 'Email is required.';
      }

      $('.nome_error').text('');
      // $('.cognome_error').text('');
      $('.telefono_error').text('');
      $('.azienda_error').text('');
      $('.email_error').text('');

      let error = false;

      if (nome == '' || nome == undefined) {
        $('.nome_error').text(name_error);
        error = true;
      }

      // if (cognome == '' || cognome == undefined) {
      //     $(".cognome_error").text(cognome_error);
      //     error = true;
      // }
      if (azienda == '' || azienda == undefined) {
        $('.azienda_error').text(azienda_error);
        error = true;
      }

      if (telefono == '' || telefono == undefined) {
        $('.telefono_error').text(telefono_error);
        error = true;
      }

      if (email == '' || email == undefined) {
        $('.email_error').text(email_error);
        error = true;
      }
      return error;
    }

    $('#pdf_submit_ptn').on('click', function (e) {
      e.preventDefault();
      let url = action_url_ajax.ajax_url;

      var nome = $('#nome').val();
      // var cognome = $("#cognome").val();
      var azienda = $('#azienda').val();
      var telefono = $('#telefono').val();
      var email = $('#email').val();
      var is_en = $('#is_en').val();

      var mail_to = $('#mail_to').val();

      let profile_one = 0;
      if ($('#octagona_profile_one').prop('checked') == true) {
        profile_one = 1;
      }

      let profile_two = 0;
      if ($('#octagona_profile_two').prop('checked') == true) {
        profile_two = 1;
      }

      let profile_three = 0;
      if ($('#octagona_profile_three').prop('checked') == true) {
        profile_three = 1;
      }

      let profile_four = 0;
      if ($('#octagona_profile_four').prop('checked') == true) {
        profile_four = 1;
      }

      let voglio_ricevere = 0;
      let voglio_ricevere_two = 0;

      if ($('#voglio_ricevere').prop('checked') == true) {
        voglio_ricevere = 1;
      }
      if ($('#voglio_ricevere_two').prop('checked') == true) {
        voglio_ricevere_two = 1;
      }

      let check_pdf_validation = pdf_form_validation(
        nome,
        azienda,
        telefono,
        email
      );

      if (check_pdf_validation) {
        return;
      }
      // console.log('fgfh');
      //             return;

      $('#pdf_submit_ptn').hide();
      $('#pdf_submit_ptn').prop('disabled', true);
      $('button#oc_cs_btn_dgn_load').show();

      $.ajax({
        url: url,
        data: {
          action: 'pdf_sending_form_action',
          nome: nome,
          azienda: azienda,
          telefono: telefono,
          email: email,
          profile_one: profile_one,
          profile_two: profile_two,
          profile_three: profile_three,
          profile_four: profile_four,
          ricevere_one: voglio_ricevere,
          ricevere_two: voglio_ricevere_two,
          is_en: is_en,
          mail_to: mail_to,
        },
        type: 'post',
        dataType: 'JSON',
        success: function (data) {
          // if (data.error == false) {
          $('.final_mmsg').css({ display: 'block' });
          $('.final_mmsg p').html(data.message);

          $('#pdf_submit_ptn').show();
          $('#pdf_submit_ptn').prop('disabled', false);
          $('button#oc_cs_btn_dgn_load').hide();

          setTimeout(function () {
            $('.final_mmsg').css({ display: 'none' });
          }, 2000);
          // }
        },
      });
    });
    /**
     * End PDF sending form
     */

    /**
     * Start common mail sending form
     */

    function cmnf_form_validation(nome, cognome, telefono, email) {
      var currentURL = window.location.href;
      if (currentURL.includes('/en/')) {
        var name_error = 'Name is required.';
        var cognome_error = 'Surename is required.';
        var telefono_error = 'Phone No is required.';
        var email_error = 'Email is required.';
      } else {
        var name_error = 'Nome is required.';
        var cognome_error = 'Cognome is required.';
        var telefono_error = 'Telefono is required.';
        var email_error = 'Email is required.';
      }

      $('.name_error').text('');
      $('.cognome_error').text('');
      $('.telefono_error').text('');
      $('.email_error').text('');

      let error = false;

      if (nome == '' || nome == undefined) {
        $('.name_error').text(name_error);
        error = true;
      }

      if (cognome == '' || cognome == undefined) {
        $('.cognome_error').text(cognome_error);
        error = true;
      }

      if (telefono == '' || telefono == undefined) {
        $('.telefono_error').text(telefono_error);
        error = true;
      }

      if (email == '' || email == undefined) {
        $('.email_error').text(email_error);
        error = true;
      }
      return error;
    }

    $('#cmn_cntf_dgn_btn').on('click', function (e) {
      e.preventDefault();
      let url = action_url_ajax.ajax_url;

      var nome = $('#name').val();
      var cognome = $('#cognome').val();
      var telefono = $('#telefono').val();
      var email = $('#email').val();

      var ruolo = $('#ruolo').val();
      var azienda = $('#azienda').val();
      var messaggio = $('#messaggio').val();

      var mail_to = $('#mail_to').val();

      let voglio_ricevere = 0;
      let voglio_ricevere_two = 0;

      if ($('#voglio_ricevere').prop('checked') == true) {
        voglio_ricevere = 1;
      }
      if ($('#voglio_ricevere_two').prop('checked') == true) {
        voglio_ricevere_two = 1;
      }

      let check_cmnf_validation = cmnf_form_validation(
        nome,
        cognome,
        telefono,
        email
      );
      if (check_cmnf_validation) {
        return;
      }

      $('#cmn_cntf_dgn_btn').hide();
      $('#cmn_cntf_dgn_btn').prop('disabled', true);
      $('button#oc_con_btn_dgn_load').show();
      $.ajax({
        url: url,
        data: {
          action: 'cmnf_sending_form_action',
          nome: nome,
          cognome: cognome,
          telefono: telefono,
          email: email,
          ricevere_one: voglio_ricevere,
          ricevere_two: voglio_ricevere_two,
          ruolo: ruolo,
          azienda: azienda,
          messaggio: messaggio,
          mail_to: mail_to,
        },
        type: 'post',
        dataType: 'JSON',
        success: function (data) {
          // if (data.error == false) {
          $('.final_mmsg').css({ display: 'block' });
          $('.final_mmsg').html(data.message);

          $('#cmn_cntf_dgn_btn').show();
          $('#cmn_cntf_dgn_btn').prop('disabled', false);
          $('button#oc_con_btn_dgn_load').hide();

          setTimeout(function () {
            $('#octgn_common_form_message').css({ display: 'none' });
          }, 2000);
          // }
        },
      });
    });

    /**
     * End common mail sending form
     */

    // // Country form 1
    // var form = $('.new_form_countryy');
    // // Add an event listener to the form's submit event
    // form.on('submit', function (event) {
    //     // Prevent the default form submission
    //     event.preventDefault();
    //     // Get the values of the required fields
    //     var nome = $('#name').val();
    //     var cognome = $('#cognome').val();
    //     var telefono = $('#telefono').val();
    //     var email = $('#email').val();

    //     var currentURL = window.location.href;
    //     if (currentURL.includes('/en/')) {
    //         var name_error_msg = 'Name is required.';
    //         var cognome_error_msg = 'Surename is required.';
    //         var telefono_error_msg = 'Phone No is required.';
    //         var email_error_msg = 'Email is required.';
    //     } else {
    //         var name_error_msg = 'Nome is required.';
    //         var cognome_error_msg = 'Cognome is required.';
    //         var telefono_error_msg = 'Telefono is required.';
    //         var email_error_msg = 'Email is required.';
    //     }

    //     // Clear any previous error messages
    //     $('.name_error').text('');
    //     $('.cognome_error').text('');
    //     $('.telefono_error').text('');
    //     $('.emaile_error').text('');

    //     // Check if the required fields are empty
    //     if (nome === '') {
    //         $('.name_error').text(name_error_msg);
    //     } else if (cognome === '') {
    //         $('.cognome_error').text(cognome_error_msg);
    //     } else if (telefono === '') {
    //         $('.telefono_error').text(telefono_error_msg);
    //     } else if (email === '') {
    //         $('.emaile_error').text(email_error_msg);
    //     } else {

    //         var endpoint = $(".new_form_country").attr("action");
    //         var form = $('.new_form_country').serialize();
    //         var formdata = new FormData;
    //         formdata.append('action', 'octgn_common_form_action_mail_sending');
    //         formdata.append('octgn_common_form_action_mail_sending', form);
    //         // alert(endpoint) ;
    //         $('.show_loader').removeClass('d-none');
    //         $('.rc_btn_dgn').prop('disabled', true);
    //         $.ajax(endpoint, {
    //             type: 'POST',
    //             data: formdata,
    //             processData: false,
    //             contentType: false,
    //             success: function (res) {
    //                 //   alert(res)

    //                 $('.show_loader').addClass('d-none');
    //                 $('.rc_btn_dgn').prop('disabled', false);
    //                 window.location.href = res;
    //             },
    //             error: function (err) {
    //             }
    //         });
    //         // form.off('submit'); // Remove the event listener
    //         // form.submit(); // Trigger the form submission
    //         // window.location.href = "https://octagona.com/ringraziamento-contatto/";
    //     }
    // });

    // // Country form 2
    // var form = $('.new_form_2_country');
    // var button = $('.rc_btn_dgn_submit');
    // // Add an event listener to the form's submit event
    // button.on('click', function (event) {
    //     // Prevent the default form submission
    //     event.preventDefault();
    //     // Get the values of the required fields
    //     var nome = $('#name2').val();
    //     var cognome = $('#cognome2').val();
    //     var telefono = $('#telefono2').val();
    //     var email = $('#email2').val();

    //     var currentURL = window.location.href;
    //     if (currentURL.includes('/en/')) {
    //         var name_error_msg = 'Name is required.';
    //         var cognome_error_msg = 'Surename is required.';
    //         var telefono_error_msg = 'Phone No is required.';
    //         var email_error_msg = 'Email is required.';
    //         var checkbox_error_msg = 'this checkbox is required.';
    //     } else {
    //         var name_error_msg = 'Nome is required.';
    //         var cognome_error_msg = 'Cognome is required.';
    //         var telefono_error_msg = 'Telefono is required.';
    //         var email_error_msg = 'Email is required.';
    //         var checkbox_error_msg = 'this checkbox is required.';
    //     }

    //     // Clear any previous error messages
    //     $('.name_error2').text('');
    //     $('.cognome_error2').text('');
    //     $('.telefono_error2').text('');
    //     $('.emaile_error2').text('');
    //     $('.checkbox_error').text('');

    //     // Check if the required fields are empty
    //     if (nome === '') {
    //         $('.name_error2').text(name_error_msg);
    //     } else if (cognome === '') {
    //         $('.cognome_error2').text(cognome_error_msg);
    //     } else if (telefono === '') {
    //         $('.telefono_error2').text(telefono_error_msg);
    //     } else if (email === '') {
    //         $('.emaile_error2').text(email_error_msg);
    //     } else {
    //         // Proceed with the form submission
    //         form.off('submit'); // Remove the event listener
    //         form.submit(); // Trigger the form submission
    //     }
    // });

    $('.checked_boxn_left span.wpcf7-list-item-label').html(
      `DICHIARO DI AVER LETTO <a class="policy_class" href="https://www.iubenda.com/privacy-policy/17728625">L'INFORMATIVA SULLA PRIVACY</a > ED AUTORIZZO IL TRATTAMENTO DEI MIEI DATI PERSONALI AI SENSI DELL' ART. 13 DEL D.LGS. N. 196/2003.`
    );

    // $('.guida-accordion-main .accordion-item .accordion-body .guida-grid-parent.videos .grid-bg .guida-see-more a').magnificPopup({
    // 		disableOn: 700,
    // 		type: 'iframe',
    // 		mainClass: 'mfp-fade',
    // 		removalDelay: 160,
    // 		preloader: false,

    // 		fixedContentPos: false
    // 	});

    // 	 $('.guida-accordion-main .accordion-item .accordion-body .guida-grid-parent.videos .grid-bg .guida-see-more a').magnificPopup({
    //         type: 'iframe',
    //         iframe: {
    //           markup:
    //             '<div class="mfp-iframe-scaler">' +
    //             '<div class="mfp-close"></div>' +
    //             '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
    //             '</div>',

    //           patterns: {
    //             youtube: {
    //               index: 'youtube.com/',

    //               id: 'v=',

    //               src: 'https://www.youtube.com/embed/%id%?autoplay=1',
    //             },
    //             vimeo: {
    //               index: 'vimeo.com/',
    //               id: '/',
    //               src: '//player.vimeo.com/video/%id%?autoplay=1',
    //             },
    //             gmaps: {
    //               index: '//maps.google.',
    //               src: '%id%&output=embed',
    //             },
    //           },

    //           srcAction: 'iframe_src',
    //         },
    //      });

    $('.guida-collaborazioni-slider').owlCarousel({
      loop: true,
      margin: 10,
      responsiveClass: true,
      nav: true,
      responsive: {
        0: {
          items: 1,
          margin: 0,
        },

        //   576:{
        //     items:2,

        // },
        576: {
          items: 5,
        },
        768: {
          items: 7,
        },
        992: {
          items: 8,
        },

        1200: {
          items: 9,
        },
        1366: {
          items: 10,
        },
      },
    });

    // js added by me start

    $('.insight-slider').owlCarousel({
      loop: true,
      margin: 40,
      nav: true,
      responsiveClass: true,
      center: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
          margin: 20,
        },
        550: {
          items: 2,
          margin: 20,
          center: false,
        },
        600: {
          items: 2,
          margin: 20,
        },
        900: {
          items: 3,
          margin: 20,
          center: false,
        },
        992: {
          items: 3,
          margin: 20,
          center: false,
        },
        1100: {
          items: 3.5,
          margin: 20,
        },
        1300: {
          items: 4,
          margin: 30,
        },
        1400: {
          items: 4,
        },
      },
    });
    function updateFirstVisibleSlide($slider) {
      setTimeout(function () {
        var $activeItems = $slider.find('.owl-stage .owl-item.active');
        $slider.find('.owl-stage .owl-item').removeClass('first-visible');
        $activeItems.first().addClass('first-visible');
      }, 10); // slight delay ensures DOM is updated
    }

    var $slider = $('.operiamo-slider');

    $slider.owlCarousel({
      loop: true,
      margin: 35,
      nav: true,
      responsiveClass: true,
      center: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
          margin: 20,
        },
        550: {
          items: 2,
          margin: 20,
          center: false,
        },
        900: {
          items: 3,
          margin: 25,
        },
        1300: {
          items: 3,
        },
      },
    });

    $slider.on(
      'initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel',
      function () {
        updateFirstVisibleSlide($slider);
      }
    );

    $(window).on('load', function () {
      updateFirstVisibleSlide($slider);
    });

    const counters = document.querySelectorAll('.count');

    const runCounter = (el) => {
      const $el = $(el);
      const target = parseInt($el.attr('data-count'), 10);
      $({ countNum: 0 }).animate(
        { countNum: target },
        {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $el.text(Math.floor(this.countNum));
          },
          complete: function () {
            $el.text(this.countNum);
          },
        }
      );
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observerInstance.unobserve(entry.target); // run once
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    $('.clienti-slider').owlCarousel({
      loop: true,
      margin: 25,
      nav: true,
      responsiveClass: true,
      dots: false,
      responsive: {
        0: {
          items: 2,
          margin: 15,
        },
        400: {
          items: 3,
          margin: 15,
        },
        550: {
          items: 4,
          margin: 20,
        },
        600: {
          items: 4,
          margin: 20,
        },
        768: {
          items: 4,
          margin: 20,
        },
        900: {
          items: 7,
          margin: 20,
        },
        1000: {
          items: 8,
          margin: 20,
        },
        1300: {
          items: 10,
          margin: 20,
        },
        1400: {
          items: 10,
        },
      },
    });
    $('#copy-year').text(new Date().getFullYear());

    // header sticky start
    $(window).scroll(function () {
      var navbar = $('#main-header');

      if ($(window).scrollTop() >= 110) {
        $('#header').addClass('fixed-header');
        navbar.addClass('sticky');
      } else {
        $('#header').removeClass('fixed-header');
        navbar.removeClass('sticky');
      }
    });
    // header sticky start

    // mobile menu show hide start
    $('.main-header .header-bar').click(function () {
      $(this).toggleClass('active');
      $('#targetElement').removeClass('sidebar-hide');
    });
    $('.sidebar-area .header-bar').click(function () {
      $('.main-header .header-bar').removeClass('active');

      $('#targetElement').addClass('sidebar-hide');
    });

    // sidebar slideup and down

    var $ul = $('.mobile-menu-items > ul');

    $ul.find('li > a > i').click(function (e) {
      e.preventDefault();

      var $li = $(this).closest('li');

      if ($li.find('ul').length > 0) {
        if ($li.hasClass('selected')) {
          $li.removeClass('selected').find('li').removeClass('selected');
          $li.find('ul').slideUp(400);
          $li.find('a i').removeClass('mdi-flip-v');
        } else {
          if ($li.parents('li.selected').length == 0) {
            $ul.find('li').removeClass('selected');
            $ul.find('ul').slideUp(400);
            $ul.find('li a i').removeClass('mdi-flip-v');
          } else {
            $li.parent().find('li').removeClass('selected');
            $li.parent().find('> li ul').slideUp(400);
            $li.parent().find('> li a i').removeClass('mdi-flip-v');
          }

          $li.addClass('selected');
          $li.find('>ul').slideDown(400);
          $li.find('>a>i').addClass('mdi-flip-v');
        }
      }
    });

    $('.mobile-menu-items > ul ul').each(function (i) {
      if ($(this).find('>li>ul').length > 0) {
        var paddingLeft = $(this)
          .parent()
          .parent()
          .find('>li>a')
          .css('padding-left');
        var pIntPLeft = parseInt(paddingLeft);
        var result = pIntPLeft + 4;

        $(this).find('>li>a').css('padding-left', result);
      } else {
        var paddingLeft = $(this)
          .parent()
          .parent()
          .find('>li>a')
          .css('padding-left');
        var pIntPLeft = parseInt(paddingLeft);
        var result = pIntPLeft + 4;

        $(this)
          .find('>li>a')
          .css('padding-left', result)
          .parent()
          .addClass('selected--last');
      }
    });

    var activeLi = $('li.selected');
    if (activeLi.length) {
      opener(activeLi);
    }

    function opener(li) {
      var ul = li.closest('ul');
      if (ul.length) {
        li.addClass('selected');
        ul.addClass('open');
        li.find('>a>i').addClass('mdi-flip-v');

        if (ul.closest('li').length) {
          opener(ul.closest('li'));
        } else {
          return false;
        }
      }
    }
    // js added by me end
  });
})(jQuery);
