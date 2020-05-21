var socket;

if(socket===undefined){
    socket = io("http://software-city.org:8080")
    console.log("newconn")
}else{
    inputtext.disabled = false;
}

socket.on('connect', function(){
    socket.emit('connected', {
        data: 'Connected',
        user: getVal("credentials")[0]
    });
    inputtext.disabled = false;
});

function send(){
    var message = inputtext.value
    if(message == ""){return}
    var string = "";
    for(var x of message){
        if(x.charCodeAt(0)==10){
            x = "<br>"
        }
        string += x;
    }
    if(string.includes("http://")||string.includes("https://")){
        var arr = string.split(" ")
        string = ""
        for(var x of arr){
            if(x.includes("http://")||x.includes("https://")){
                x = `<a onclick="openwebpage(this.getAttribute('reference'))" href="#" reference="${x}">${x}</a>`
                string += x + " "
            }else{
                string += x
            }
        }
    }
    string.replace('"', "")
    try {
        socket.emit("xmit", {
            user: getVal("credentials")[0],
            message: string
        });
        inputtext.value = ""
    } catch (error) {
        throw error
    }
    
}

socket.on("connection", function(msg){
    console.log(msg)
});

socket.on('recx', function(msg){
    sendtoscreen(msg.message, msg.user)
});