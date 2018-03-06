/**
 * Read sample data
 */
function readSpreadSheetData() {
    var content = "Added ";
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1EwnEaHGdMrIdU8BeEqUUCG5HkZxdF4YdN-vO-UEWv2c',
        range: 'Sheet1!A2',
    }).then(function(response) {
        var text = response.result;
        if (text.values.length > 0) {
            if(text.values[0][0] !== cache){
                appendPre(text.values[0][0]);
                editWikiPage( content+text.values[0][0], text.values[0][0], "+\\" );
            }
        } else {
            appendPre('No data found.');
        }
        cache = text.values[0][0];
    }, function(response) {
        appendPre('Error: ' + response.result.error.message);
    });
}

/**
 * Edit a page or Wiki table
 */
 function editWikiPage( summary, content="Content changed", editToken ) {
    $.ajax({
        url: "https://www.mediawiki.org/w/api.php",
        data: {
            format: 'json',
            action: 'edit',
            title: 'User:Alangi_Derick/Sandbox/RefPage',
            summary: summary,
            text: content,
            token: editToken
        },
        dataType: 'json',
        type: 'POST',
        success: function( data ) {
            if ( data && data.edit && data.edit.result == 'Success' ) {
                window.location.reload(); // reload page if edit was successful
            } else if ( data && data.error ) {
                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                alert( 'Error: Unknown result from API.' );
            }
        }
    });
}

window.setInterval(function(){
    handleClientLoad()
}, 5000);