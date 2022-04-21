$(document).ready(function (e) {
    $("#filePush").on('click',(function(e) {
     e.preventDefault();
     console.log($(".file-field").val());
     $.ajax({
            url: "http://127.0.0.1:5500/includes/fileupload.php",
            type: "POST",
            data: '{"value":"10"}', //Data sent to server
            contentType:"application/json",
            dataType: "json",
            cache: false,
            processData:false,
            beforeSend : function(){
                $("#fileErr").fadeOut();
            },
            success: function(data){
                if(data=='invalid'){
                        $("#fileErr").html("Invalid File !").fadeIn();
                }else{
                    // view uploaded file.
                    $("#preview").html(data).fadeIn();
                    $("#form")[0].reset();
                }
            },
            error: function(e) {
                $("#fileErr").html(e).fadeIn();
            }          
       });
    }));
});