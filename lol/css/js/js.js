$(document).ready(function(e) {
    var faviconnumber = 1;
     function favicon() {
         favicon = favicon == 1 ? 2 : 1;
         $('.favicon').attr('href','favicon' + favicon + ".png");
     }
    console.clear();
    var commandlist = [ 
       ["/help", "Show commands"],
       ["/list", "List all pages on the website."],
       ["/nav &lt;location&gt;", "Navigate to location."],
       ["/dox &lt;full name&gt;", "Search dox everyone."],
       ["/clear", "Clear cmd."],
       ["/index", "Go to index."],
    ];
    var previouscommands = [];
    var currentcommand = 0;
    var pages = [
       ["info", "Connect with ducatti",
       "[^https://discord.com/users/684902555670806546](Discord: xxy#2001)",
       "[^https://discord.com/users/398889711432761345](Discord: tadeo#4151)",
       "[^http://steamcommunity.com/id/xxy2001](Steam xxy)",
       "[^https://steamcommunity.com/profiles/76561199237612962](Steam tadeo)",
       "[^http://twitter.com/duki](Twitter xxy)",
       "[^http://twitter.com/duki](Twitter tadeo)"],
    ];
    var pageindex = ["info"];
    var currentpage = "Welcome loading commands";
    var url = "https://ducatti.xyz"
       /*
          Custom Text Syntax
          Links:      
             [URLPATH](NAME) - regular
             [^URLPATH](NAME) - open in new tab
             
          Styles:
             *TEXT* - bold text
             E! - Text is an error/notification
             A! - spaces are converted to non-breaking spaces (it's for ascii art - after all, this is a text based website)
       */
 
    function init() {
       setInterval(time);
       console.clear();
       console.log(new Date().getTime());
       log("System", "A!##     ## ##     ## ##    ##      ####       ########    ###      #######   ########  ####### ");
       log("System", "A!##   ##   ##   ##   ##  ##      ##  ##         ##      ## ##      ##     ## ##       ##     ## ");
       log("System", "A! ## ##     ## ##     ####        ####          ##     ##   ##     ##     ## ##       ##     ## ");
       log("System", "A!  ###       ###       ##        ####           ##    ##     ##    ##     ## ######   ##     ## ");
       log("System", "A! ## ##     ## ##      ##       ##  ## ##       ##   ###########   ##     ## ##       ##     ## ");
       log("System", "A!##   ##   ##   ##     ##       ##   ##         ##  ##         ##  ##     ## ##       ##     ## ");
       log("System", "A!##    ####      ##    ##        ####  ##       ## ##           ## #######   #######   #######  ");
       log("Client", "For help type '/help'");
       setInterval(favicon,500);
    }
 
    function urlvars() {
        var pagelocs = window.location.pathname.replace("/","").split("/");
        var pageloc = pagelocs[0];
        console.log(pageloc);
        //alert();
         if(pageloc != "") {
             if ($.inArray(pageloc, pageindex) >= 0) {
                currentpage = pageloc;
             }
         }
           log("System", "You are currently on page: *" + currentpage + "*");
         if(pageloc != "") {
             if ($.inArray(pageloc, pageindex) >= 0) {
                currentpage = pageloc;
                loadpage($.inArray(pageloc, pageindex));
             } else {
                //Un-note next line to show 404 errors with wrong urls
                //log("Client", "404 - The page '" + pageloc + "' does not exist. To "); 
             }
         }
    }
    function getParam(name){
         name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
         var regexS = "[\\?&]"+name+"=([^&#]*)";
         var regex = new RegExp( regexS );
         var results = regex.exec (window.location.href);
         if (results == null) {
             return "";
         }
         else  {
             return results[1];
         }
     }
 
    function log(name, information) {
       var d = new Date();
       var hours = ((d.getHours() < 10) ? "0" : "") + d.getHours();
       var minutes = ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes();
       var seconds = ((d.getSeconds() < 10) ? "0" : "") + d.getSeconds();
       var colour = "whitet";
       var textcolour = "";
       var postcolour = "";
 
       switch (name[0]) {
          case "!":
             postcolour = " important";
             name = name.substr(1);
             break;
       }
       switch (name) {
          case "System":
             colour = "redt";
             break;
          case "Server":
             colour = "bluet";
             break;
          case "Client":
             colour = "bluet";
             break;
          case "User":
             colour = "greent";
             postcolour = " selft";
             break;
       }
       if (information[0] == "A" && information[1] == "!") {
          information = information.substr(2);
          information = information.replace(/ /g, '\u00A0');
       }
       if (information[0] == "E" && information[1] == "!") {
          information = information.substr(2);
          postcolour = " important";
       }
 
       while (information.indexOf("](") >= 0) { //URL parser
 
          var NAMEregExp = /\(([^)]+)\)/;
          var uname = NAMEregExp.exec(information)[1];
 
          var URLregExp = /\[([^)]+)\]/;
          var url = URLregExp.exec(information)[1];
          var newpage = false;
          if (url[0] == "^") {
             newpage = true;
             url = url.substr(1);
          }
          var start = information.indexOf("[");
          var end = information.indexOf(")");
          if (newpage) {
             information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '" target="_blank">' + uname + '</a>');
          } else {
             information = information.replace(information.substring(start, end + 1), "").splice(start, 0, '<a href="' + url + '">' + uname + '</a>');
          }
          //information = '<a href="' + url + '">' + uname + '</a>'; //working
 
       }
       var tobold = true;
       var boldnumber = 0;
       for (var i = 0; i < information.length; i++) {
          if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
             boldnumber++;
          }
       }
       while (information.indexOf("*") >= 0) { //Bold parser
          var pos = information.indexOf("*");
          information = information.replace("*", "");
          if (tobold) {
             information = information.splice(pos, 0, '<b>');
          } else {
             information = information.splice(pos, 0, '</b>');
          }
          tobold = !tobold;
          if (tobold && boldnumber <= 1) {
             break;
          }
          //information = '<a href="' + url + '">' + uname + '</a>'; //working
       }
       var tounderline = true;
       var underlinenumber = 0;
       for (var i = 0; i < information.length; i++) {
          if (information[i] == "*" && information[i - 1] != "*" && information[i + 1] != "*") {
             underlinenumber++;
          }
       }
       while (information.indexOf("**") >= 0) { //Bold parser
          var pos = information.indexOf("**");
          information = information.replace("**", "");
          if (tounderline) {
             information = information.splice(pos, 0, '<u>');
          } else {
             information = information.splice(pos, 0, '</u>');
          }
          tounderline = !tounderline;
          if (tounderline && underlinenumber <= 1) {
             break;
          }
          //information = '<a href="' + url + '">' + uname + '</a>'; //working
       } /**/
       $(".stream").append('<div class="line">' +
          '<p class="time">[' + hours + ":" + minutes + ":" + seconds + ']</p>' +
          '<p class="name ' + colour + '">' + name + '</p>' +
          '<p class="information' + postcolour + '">' + information + '</p>' +
          '</div>');
       $(document).scrollTop($(document).height() - $(window).height());
    }
     var timestring = "";
    function time() {
       var d = new Date();
       var hours = d.getHours();
       var minutes = d.getMinutes();
       var seconds = d.getSeconds();
       if (hours < 10) {
          hours = "0" + hours;
       }
       if (minutes < 10) {
          minutes = "0" + minutes;
       }
       if (seconds < 10) {
          seconds = "0" + seconds;
       }
       var temptimestring = "[" + hours + ":" + minutes + ":" + seconds + "]";
       if (temptimestring != timestring) {
           timestring = temptimestring;
           $(".editline .time").text(timestring);
       }
    }
 
    var ctrldown = false;
    $(".editline .edit").keydown(function(e) {
       var text = $(".editline .edit").text();
       console.log(e.which);
       if (e.which == 13 && text !== "" && !ctrldown) {
          var commands = text.split(' ');
          var output = "";
          if (commands[0] == "help") {
             text = "/" + text;
          }
          $(".editline .edit").text("");
          log("User", text);
 
          previouscommands[currentcommand] = text;
          currentcommand = previouscommands.length;
          $(".editline .edit").keydown(35);
          cmd(commands[0], text, commands);
          /*Add mod commands*/
          //modcmd(commands[0], text, commands);
          /*Add mod commands*/
 
       }
       if (e.which == 38) { //up
          if (currentcommand > 0) {
             currentcommand--;
             $(".editline .edit").text(previouscommands[currentcommand]);
          }
       }
       if (e.which == 40) { //down
 
          if (currentcommand < previouscommands.length) {
             currentcommand++;
             $(".editline .edit").text(previouscommands[currentcommand]);
          }
       }
    });
 
    function cmd(command, words, word) {
       switch (word[0]) {
          case "/help":
          case "help":
             for (var i = 0; i < commandlist.length; i++) {
                output = commandlist[i][0] + " : " + commandlist[i][1];
                //console.log(command[i][0]);
                log("Client", output);
             }
             break;
         case "/dox":
             window.location.href = "https://youtu.be/HL7lbpnNzjM";
             break;
         case "/1001":
             window.location.href = "https://cdn.discordapp.com/attachments/913435979531026483/935407717345017866/foto-5.png";
             break;
          case "/clear":
             $(".stream").text("");
             break;
          case "/nav":
             if ($.inArray(word[1], pageindex) >= 0) {
                currentpage = word[1];
                log("Website", "You are now in " + currentpage);
                loadpage($.inArray(word[1], pageindex));
             } else {
                log("Client", "'" + word[1] + "' does not exist.");
             }
             break;
          case "/index":
               window.location.href = "https://ducatti.xyz/proximamente";
               break;
         case "/connect":
                log("Client", "> " + "Type /nav connect");
             break;
          case "/list":
             $.each(pageindex, function(id, content) {
                log("Client", "> " + content);
             });
       }
    }
 
    function loadpage(i) {
       $.each(pages[i], function(id, content) {
          if (content != pageindex[i]) {
             log("Website", content);
          }
       });
    }
    var loginreturn = false;
 
    function loginemptyreturn() {
       //log("Client", "ER2");
       if (!loginreturn) {
       }
    }
    String.prototype.splice = function(idx, rem, str) {
       return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    init();
 });
