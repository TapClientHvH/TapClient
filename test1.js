const kv_config_link = "https://raw.githubusercontent.com/TapClientHvH/TapClient/master/test1.js"; // Has to be a actuall link, like to a text file/raw file.
const kv_config_version = "1.1";
const kv_config_name = "TapClient";

function checkVersion()
{
    var http = require('http');
    var fs = require('fs');
    var options = {
        host: kv_config_link,
        path: '/'
    }
    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            Global.Print("[KV-AutoUpdate] Checking version...");
            if (!data.includes("const kv_config_version = " + '"' + kv_config_version + '"' + ";"))
            {
                Global.Print("[KV-AutoUpdate] Version out of date. Updating...")
                Global.PrintChat("[KV-AutoUpdate] Updating script, please reload your scripts...")
                fs.writeFile(kv_config_name + "_updated.js", data, function (err) {
                    if (err) throw err;
                    Global.Print("[KV-AutoUpdate] Update complete! Reload your scripts...")
                    return false;
                });
            }
        });



    });
    request.on('error', function (e) {
        Global.Print("[KV-AutoUpdate] Failed to read the end url.")
    });
    request.end();
    return true;
}




















var screen_width = Math.round(Global.GetScreenSize()[0]);

function HSVtoRGB(h, s, v)
{
    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function onDrawEvent()
{
    var colors = HSVtoRGB(Global.Realtime() * UI.GetValue("MISC", "JAVASCRIPT", "Script Items", "Rainbow Line Speed"), 1, 1);

    Render.GradientRect(0, 0, screen_width/2, 4, 1, [colors.g, colors.b, colors.r, 255], [colors.r, colors.g, colors.b, 255]);
    Render.GradientRect(screen_width/2, 0, screen_width/2, 4, 1, [colors.r, colors.g, colors.b, 255], [colors.b, colors.r, colors.g, 255]);
}

Global.RegisterCallback("Draw", "onDrawEvent");
UI.AddSliderFloat("Rainbow Line Speed", 0.01, 1.0);
UI.SetValue("MISC", "JAVASCRIPT", "Script Items", "Rainbow Line Speed", 0.1);
