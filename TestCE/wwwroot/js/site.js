// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function Swap() {
    var v1 = $('#my_select').html(),
        v2 = $('#TO').html();
    $('#my_select').html(v2);
    $('#TO').html(v1);
};

function filterFunction(id, idd) {
    var input, filter, i;
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    tr = document.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[idd];
        txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
    }
};

function Deserialization() {
    let endpoint, access_key, from, to, amount, rate;
    // set endpoint and your API key
    endpoint = 'convert';
    access_key = 'API_KEY';

    // define from currency, to currency, and amount
    from = $("#my_select").children('img').attr('data-value').toString();
    to = $("#TO").children('img').attr('data-value').toString();
    amount = $("#fromamount").val().toString();

    // execute the conversion using the "convert" endpoint:
    $.ajax({
        url: 'https://api.exchangeratesapi.io/v1/' + endpoint + '?access_key=' + access_key + '&from=' + from + '&to=' + to + '&amount=' + amount,
        dataType: 'jsonp',
        success: function (json) {
            // access the conversion result in json.result
            $('#convertto').val(json.result);
            rate = (json.result / amount).toFixed(4);
            $('#calculatedrate').text(rate);
            $('#currencyfrom').text(from);
            $('#currencyto').text(to);
        }
    });
}

function Exchange() {
    event.preventDefault();
    let fc, tc, fa;
    fc = $("#my_select").children('img').attr('data-value');
    tc = $("#TO").children('img').attr('data-value');
    fa = $("#fromamount").val();
    if (fa === "0") {
        $('span').text("This field is required");
    } else {
        Deserialization();
        $.post('../Home/AddExchange',
            {
                FromCurrency: fc,
                ToCurrency: tc,
                FromAmount: fa
            }).done(function () {
                $.getJSON("../Home/GetLastPost", function (data) {
                    var table_value = '';
                    table_value += '<tr>';
                    table_value += '<td>' + data.Id + '</td>';
                    table_value += '<td>' + data.FromCurrency + '</td>';
                    table_value += '<td>' + data.FromAmount + '</td>';
                    table_value += '<td>' + data.ToCurrency + '</td>';
                    table_value += '<td>' + data.ToAmount + '</td>';
                    table_value += '<td>' + data.Date + '</td>';
                    table_value += '</tr>';
                    $("#table").append(table_value);
                })
            }),
            "json"
    }
}

$(".dropdown-menu li").click(function () {
    var select = $(this).html();
    var buttonid = $(this).closest('div').children('button').attr('id');
    if (buttonid === 'my_select') {
        $('#my_select.dropdown-toggle').html(select);
    } else {
        $('#TO.dropdown-toggle').html(select);
    }
});

