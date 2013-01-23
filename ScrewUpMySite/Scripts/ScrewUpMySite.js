var sums = {
    _styleElement: null,
    
    initialize: function () {
        sums._styleElement = $("<style type='text/css' />");
        $("head").append(sums._styleElement);
    },
    
    updateStyle: function (newStyle) {
        if (!sums._styleElement)
            sums.initialize();
        
        sums._styleElement.html(newStyle);
    }
};


var sumsEditor = {
    _dialog: null,
    _dialog_fontFamily: null,
    _dialog_fontColor: null,
    _dialog_backgroundColor: null,

    updateMethod: null,


    bindTo: function (jQuerySelector) {
        jQuerySelector.click(function () {
            sumsEditor.show();
        });
    },


    show: function () {
        if (!sumsEditor._dialog)
            sumsEditor.createDialog();

        sumsEditor._dialog.dialog("open").focus();
    },


    createDialog: function () {
        sumsEditor._dialog_fontFamily = $("<input />")
            .attr("id", "fontFamily")
            .css("width", "300px");
        sumsEditor._dialog_backgroundColor = $("<input />")
            .attr("id", "backgroundColor")
            .addClass("colorpicker");
        sumsEditor._dialog_fontColor = $("<input />")
            .attr("id", "fontColor")
            .addClass("colorpicker");


        sumsEditor._dialog = $("<div />")
            .attr("title", "Screw up my site")
            .append($("<p>Font family: </p>").append(sumsEditor._dialog_fontFamily))
            .append($("<p>Background color: </p>").append(sumsEditor._dialog_backgroundColor))
            .append($("<p>Font color: </p>").append(sumsEditor._dialog_fontColor))
            .dialog({
                modal: true,
                width: 400,
                autoOpen: false,
                resizable: false,
                open: function () {
                    sumsEditor._dialog_fontFamily.val($("body").css("font-family"));
                    sumsEditor._dialog_backgroundColor.val(sumsEditor.convertRgbToHex($("body").css("background-color")));
                    sumsEditor._dialog_fontColor.val(sumsEditor.convertRgbToHex($("body").css("color")));
                },
                buttons: {
                    "Apply": function () {
                        $(this).dialog("close");
                        sumsEditor.updateMethod( sumsEditor.getStyleFromDialog());
                    }
                }
            });

        sumsEditor._dialog.find(".colorpicker")
            .css("width", "65px")
            .colorpicker({
                colorFormat: "#HEX",
                autoOpen: false,
                parts: "inline"
            });
    },


    getStyleFromDialog: function () {
        var backgroundColor = sumsEditor._dialog_backgroundColor.val();
        var fontColor = sumsEditor._dialog_fontColor.val();
        var fontFamily = sumsEditor._dialog_fontFamily.val();

        var css = "";
        if (fontFamily)
            css += "body { font-family: " + fontFamily + "; }\n";
        if (backgroundColor)
            css += "body { background-color: " + backgroundColor + "; }\n";
        if (fontColor)
            css += "body { color: " + fontColor + "; }\n";

        return css;
    },
    

    convertRgbToHex: function (rgbValue) {
        var hexValue = "#";
        var parts = rgbValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)[\),]/);
        
        if (!parts)
            return rgbValue;

        for (var i = 1; i <= 3; ++i) {
            parts[i] = parseInt(parts[i]).toString(16);
            if (parts[i].length == 1)
                parts[i] = '0' + parts[i];
            hexValue += parts[i];
        }
        
        return hexValue;
    }
}