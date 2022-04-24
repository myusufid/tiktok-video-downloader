
var URLinput = document.querySelector('.URL-input');
var urlServer = $('input[name="urlServer"]').val()
$("#failedMessage").hide()
$("#urlDownload").hide()

$("#convertButton").on("click", function(e) {
    e.preventDefault();
    $(this).prop("disabled", true);
    $(this).html(
        `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
    );
    sendURL(URLinput.value);
    $("#failedMessage").hide()
    $("#urlDownload").hide()
})

function sendURL(URL) {
    fetch(urlServer + `/download?URL=${URL}`, {
        method:'GET'
    }).then(res => res.json())
        .then(json => {
                $("#urlDownload").show()
                $("#linkDownloadVideo").attr('href', json.collector[0].videoUrl)
                $("#convertButton").html("Convert");
                $("#convertButton").prop("disabled", false);
        }).catch(error => {
                $("#urlDownload").hide()
                $("#failedMessage").show()
                $("#convertButton").html("Convert");
                $("#convertButton").prop("disabled", false);
        });
}
