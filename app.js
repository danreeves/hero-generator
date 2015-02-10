(function () {
   'use strict';

   window.onload = function () {

        // unsplash.it + uigradients.com + github zen
        var d = dimensions(),
            url = makeUrl(d.width, d.height, false, false),
            text = getText(),
            gradients = getGradients();

        Promise.all([text, gradients]).then(function (values) {
            console.log(values[0])
            var t = values[0].responseText || 'We are a digital creative agency.',
                r = arrayRand(JSON.parse(values[1].response)),
                g = makeGradient(r.colour1, r.colour2);
            makeHero(d.width, d.height, url, t, g);
        }, function (errors) {

        });

    };

    function makeHero (width, height, url, text, gradient) {
        var hero = document.getElementById('hero');
        hero.style.height = height;
        hero.style.width = width;
        hero.insertAdjacentHTML('beforeend', '<div class="img" style="background-image: url(' + url + ')" />');
        hero.insertAdjacentHTML('beforeend', '<div class="overlay" style="' + gradient +'" />');
        hero.insertAdjacentHTML('beforeend', '<p class="text">' + text + '</p>');
    }

    function dimensions () {
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function makeUrl (width, height, greyscale, blurred) {
        var url = 'https://unsplash.it{{ bw }}/{{ width }}/{{ height }}/?random{{ blur }}',
            bw = (greyscale) ? '/g'  : '',
            blur = (blurred) ? '&blur' : '';
        url = url
            .replace('{{ width }}', width)
            .replace('{{ height }}', height)
            .replace('{{ bw }}', bw)
            .replace('{{ blur }}', blur);
        return url;
    }

    function getText () {
        return new Promise(function (resolve, reject) {
            var XHR = XMLHttpRequest || ActiveXObject;
            var request = new XHR('MSXML2.XMLHTTP.3.0');
            request.open('GET', 'https://api.github.com/zen', true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) resolve(request);
            };
            request.send();
        });
    }

    function getGradients () {
        return new Promise(function (resolve, reject) {
            var XHR = XMLHttpRequest || ActiveXObject;
            var request = new XHR('MSXML2.XMLHTTP.3.0');
            request.open('GET', 'https://cdn.rawgit.com/Ghosh/uiGradients/master/gradients.json', true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) resolve(request);
            };
            request.send();
        });
    }

    function arrayRand (array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    function makeGradient(to, from) {
        var tpl = 'background: -webkit-linear-gradient(90deg, {{ from }} 10%, {{ to }} 90%); /* Chrome 10+, Saf5.1+ */' +
                  'background:    -moz-linear-gradient(90deg, {{ from }} 10%, {{ to }} 90%); /* FF3.6+ */' +
                  'background:     -ms-linear-gradient(90deg, {{ from }} 10%, {{ to }} 90%); /* IE10 */' +
                  'background:      -o-linear-gradient(90deg, {{ from }} 10%, {{ to }} 90%); /* Opera 11.10+ */' +
                  'background:         linear-gradient(90deg, {{ from }} 10%, {{ to }} 90%); /* W3C */';
        return tpl
            .replace('{{ to }}', to)
            .replace('{{ from }}', from);
    }

}());
