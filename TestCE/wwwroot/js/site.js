// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function Swap() {
    var v1 = $('#my_select :selected').val(),
        v2 = $('#TO :selected').val();
    $('#my_select').val(v2);
    $('#TO').val(v1);
    document.getElementById("currencyfrom").innerHTML = $('#my_select').val();
    document.getElementById("currencyto").innerHTML = $('#TO').val();
};

function OnSelect() {
    var a = $('#my_select :selected').val();
    b = $('#TO :selected').val();
    document.getElementById("currencyfrom").innerHTML = a;
    document.getElementById("currencyto").innerHTML = b;
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
    let link, request;
    link = 'https://api.exchangeratesapi.io/latest';
    request = new XMLHttpRequest();
    request.open('GET', link);
    request.responseType = 'json';
    request.send();
    request.onload = function GetRate() {
        responseObj = request.response;
        let q = responseObj.rates;
        a = $('#my_select :selected')[0].getAttribute("value");
        b = $('#TO :selected')[0].getAttribute("value");
        if (a == 'EUR') {
            switch (b) {
                case 'USD':
                    return c = q.USD;
                case 'GBP':
                    return c = q.GBP;
                case 'CHF':
                    return c = q.CHF;
            }
        } else if (a == 'GBP') {
            switch (b) {
                case 'EUR':
                    return c = 1 / q.GBP;
                case 'USD':
                    return c = q.USD / q.GBP;
                case 'CHF':
                    return c = q.CHF / q.GBP;
            }
        } else if (a == 'USD') {
            switch (b) {
                case 'EUR':
                    return c = 1 / q.USD;
                case 'GBP':
                    return c = q.GBP / q.USD;
                case 'CHF':
                    return c = q.CHF / q.USD;
            }
        } else if (a == 'CHF') {
            switch (b) {
                case 'EUR':
                    return c = 1 / q.CHF;
                case 'GBP':
                    return c = q.GBP / q.CHF;
                case 'USD':
                    return c = q.USD / q.CHF;
            }
        } else if (a == b) {
            return c = 1;
        }
    }
    return c.toFixed(4);
}

function CalcValue() {
    let amountfrom;
    amountfrom = document.getElementById("fromamount").value;
    document.getElementById("convertto").value = (amountfrom * Deserialization()).toFixed(2);
}

function ChangeRate() {
    document.getElementById("calculatedrate").innerHTML = " = " + Deserialization() + " ";
}

