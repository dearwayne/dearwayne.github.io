/**
 * Created by DoNow on 12/1/15.
 */
$(document).ready(function () {

    $("#authorContentScroll").mCustomScrollbar({
        theme: "rounded-dots",
        scrollInertia: 400
    });

    var slider = $.fn.fsvs({
        speed: 1000,
        bodyID: 'fsvs-body',
        selector: '> .slide',
        mouseSwipeDisance: 40,
        afterSlide: function () {
        },
        beforeSlide: function () {
        },
        endSlide: function () {
        },
        mouseWheelEvents: true,
        mouseWheelDelay: false,
        scrollableArea: 'scrollable',
        mouseDragEvents: true,
        touchEvents: true,
        arrowKeyEvents: true,
        pagination: true,
        nthClasses: false,
        detectHash: true
    });
    //slider.slideUp();
    //slider.slideDown();
    //slider.slideToIndex(0);
    slider.unbind();
    //slider.rebind();


    /**
     * 打字函数
     * @param 要打印的字
     * @param dom中的元素
     * @param 时间间隔
     * @param 是否先清除
     * @param 是否重复
     */
    var loop;

    function showText(text, element, time, clear, repeat, printUnderLine) {
        clearInterval(loop);
        if (clear == true) element.innerHTML = "";

        var i = 0;
        loop = setInterval(function () {
            var elementText = element.innerHTML;

            if (i >= text.length || !element || element.innerHTML == undefined) {
                clearInterval(loop);

                if (printUnderLine == true) {
                    element.innerHTML = elementText.substr(0, elementText.length - 2) + "<span class='blinkUnderline'> _</span>";
                }

                if (repeat == true)
                    showText(text, element, time, clear, repeat, printUnderLine);
            } else {
                if (text.charCodeAt(i) == 10) {
                    i++;
                    if (printUnderLine == true)
                        element.innerHTML = elementText.substr(0, elementText.length - 2) + "<br> _";
                    else
                        element.innerHTML += "<br>";
                } else if (text.charCodeAt(i) == 32) {
                    i++;
                    if (printUnderLine == true)
                        element.innerHTML = elementText.substr(0, elementText.length - 2) + "&nbsp; _";
                    else
                        element.innerHTML += "&nbsp;";
                } else if (text.charCodeAt(i) == 9) {
                    i++;
                    if (printUnderLine == true)
                        element.innerHTML = elementText.substr(0, elementText.length - 2) + "&nbsp;&nbsp;&nbsp;&nbsp; _";
                    else
                        element.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
                } else {
                    if (printUnderLine == true)
                        element.innerHTML = elementText.substr(0, elementText.length - 2) + text.charAt(i++) + " _";
                    else
                        element.innerHTML += text.charAt(i++);
                }
            }
        }, time ? time : 100);
    }


    var introduction;
    $(this).load("introduction.txt", function (data) {
        introduction = data;
    });

    var dic = {"csxz": 4, "ylc": 5, "tz": 5};


    showText("Welcome", typingText, 300, true, true, false);

    $(".iconImage").on("mouseenter", function () {
        if ($("#animateImageView").is(":visible")) {
            showText($(this).attr("name1"), typingText, 200, true, false, false);
        }
    }).on("mouseleave", function () {
        if ($("#animateImageView").is(":visible")) {
            showText("Welcome", typingText, 300, true, true, false, false);
        }
    });

    $(".clickBtns").on("click", function () {
        slider.unbind();
        var name = $(this).attr("name");
        if (name == "author") {
            //作者信息
            $("#authorFullScreenDiv").show();
            $("#animateImageView").hide();
            showText(introduction, authorContent, 80, true, false, true);
        } else {
            var count = dic[name];
            var imageBody = document.getElementById("fsvs-body");
            imageBody.innerHTML = "";
            for (var i = 1; i <= count; i++) {
                imageBody.innerHTML += "<div class='slide'><div class='productContent'><div class='productImage'>"
                    + "<img class='imageM' src='images/products/" + name + "/M00" + i + ".png'/>"
                    + "<img class='imageL' src='images/products/" + name + "/L00" + i + ".png'/>"
                    + "</div></div></div>";
            }

            var btns = ["csxz1","ylc1","tz1"];
            for(var i= 0;i<btns.length;i++){
                btn = btns[i];

                document.getElementById(btn).style.borderWidth = "0px";
                document.getElementById(btn).style.webkitBoxShadow = "0 0 0 transparent";
                document.getElementById(btn).style.mozBoxShadow = "0 0 0 transparent";
                document.getElementById(btn).style.boxShadow = "0 0 0 transparent";
            }
            var curBtn = document.getElementById(name + "1");
            curBtn.style.borderColor = "rgb(246, 246, 246)";
            curBtn.style.borderWidth = "1px";
            curBtn.style.borderStyle = "solid";
            curBtn.style.webkitBoxShadow = "0 0 20px rgba(246, 246, 246, .8)";
            curBtn.style.mozBoxShadow = "0 0 20px rgba(246, 246, 246, .8)";
            curBtn.style.boxShadow = "0 0 20px rgba(246, 246, 246, .8)";

            slider.rebind();
            slider.slideToIndex(0);
            $("#productFullScreenDiv").show();

        }
    });

    $("#authorDivReturnBorder").on("click", function () {
        $("#authorFullScreenDiv").hide();
        $("#animateImageView").show();
        showText("Welcome", typingText, 300, true, true, false);
    });

    $("#authorEmptyDiv").on("click", function () {
        $("#authorFullScreenDiv").hide();
        $("#animateImageView").show();
        showText("Welcome", typingText, 300, true, true, false);
    });

    $("#indexBtn").on("click", function () {
        slider.unbind();
        $("#productFullScreenDiv").hide();
        showText("Welcome", typingText, 300, true, true);
    });
})
