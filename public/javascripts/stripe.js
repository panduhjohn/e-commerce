console.log('hey from stripe')

// document.getElementById('payment-form').addEventListener('submit', function(e) {
//   e.preventDefault()
//   console.log('pay up')
// })

$(() => {
  Stripe.setPublishableKey('pk_test_tQiDRiNUPaqWWKYQELaDegj300PrB0YcTH')

  $('#payment-form').submit(event => {
    const stripeResponseHandler = (status, response) => {
      // console.log(`status`, status);
      // console.log(`response`, response);
      const $form = $('#payment-form')

      if (response.error) {
        console.log(`Stripe Error: ${response.error.message}`)

        debugger

        $form.find('.payment-errors').text(response.error.message)

        //   $form.find('.payment-errors').parent().parent().css('display','block'); (((or use whats on the line below)))
        $form
          .find('.payment-errors')
          .parent()
          .parent()
          .show()

        $('#cardSubmit').prop('disabled', false)
      } else {
        const token = response.id

        $form.append($('<input type="hidden" name="stripeToken" />').val(token))

        $form.get(0).submit()
      }
    }

    event.preventDefault()

    let cardNumber = $('#card-number').val()
    let cvcCode = $('#card-cvc').val()
    let expMonth = $('#card-expiry-month-year')
      .val()
      .slice(0, 2)
    let expYear = $('#card-expiry-month-year')
      .val()
      .slice(2, 4)

    //   console.log(`cardNumber`, cardNumber)
    //   console.log(`cvcCode`, cvcCode)
    //   console.log(`expMonth`, expMonth)
    //   console.log(`expYear`, expYear)

    Stripe.card.createToken(
      {
        number: cardNumber,
        cvc: cvcCode,
        exp_month: expMonth,
        exp_year: expYear
      },
      stripeResponseHandler
    )

    $('#cardSubmit').prop('disabled', true)

    console.log('Wheres my money man')
  })
})
