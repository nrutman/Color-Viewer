(function($) {

    var viewer = new Viewer();
    $(document).ready(viewer.render);


    function Viewer() {
        var self = this;

        this.render = render;

        function render() {
            var $input = $('#input');
            var $colors = $('#colors');
            var colorPattern = /^(\$[\w-]+):\s+(\#[\w]+);$/gi;

            $input.on('change', renderColors);
            renderColors();

            function renderColors() {
                var codes = $input.val().split("\n");
                var isNewline = false;

                codes.forEach(function(code) {
                    var parts = colorPattern.exec(code);

                    if (!parts || parts.length !== 3) {
                        isNewline = true;
                        return;
                    }

                    var colorName = parts[1];
                    var colorHex = parts[2];

                    var $color = $('<li>')
                        .css({
                            backgroundColor: colorHex
                        })
                        .toggleClass('newline', isNewline);

                    var $label = $('<span>')
                        .addClass('label')
                        .text(colorName);

                    $color.append($label);
                    $colors.append($color);
                });
            }

        }
    }

})(jQuery);
