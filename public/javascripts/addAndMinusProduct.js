$(document).on('click', '#plus', (event) => {
    let priceValue = parseFloat($('#priceValue').val())
    let quantity = parseInt($('#quantity').val())

    priceValue += parseFloat($('#priceHidden').val())
    quantity++

    $('#quantity').val(quantity)
    $('#priceValue').val(priceValue.toFixed(2))
    $('#total').html(quantity)
})

$(document).on('click', '#minus', (event) => {
    let priceValue = parseFloat($('#priceValue').val())
    let quantity = parseInt($('#quantity').val())

    if (quantity === 1) {
        priceValue = parseFloat($('#priceHidden').val())
    } else {
        priceValue -= parseFloat($('#priceHidden').val())
        quantity--
    }
    
    $('#quantity').val(quantity)
    $('#priceValue').val(priceValue.toFixed(2))
    $('#total').html(quantity)
})






{/* <script>
    $(document).on('click', '#plus', (event) => {
        let str = $('#total').text();

        // Number(str) + 1

        $('#total').text(Number(str) + 1);
        
    }) 

    $(document).on('click', '#minus', (event) => {
        let str = $('#total').text();
        Number(str)
        $('#total').text( - 1);

        if(str === 0) {

        }
        
    }) 
    
    // $('total')
    // $(document).on('click', '#plus', (event) => {
    // $('#total')
    //     $('#total').text($('#pricevalue') * $('#total'))
    // }) 

    </script> */}