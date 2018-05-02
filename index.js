'use strict';

exports.__esModule = true;

var crypto = require('crypto');
var fs = require('fs');
const md5File = require('md5-file')

let fileList = []

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _getExt (src) {
    return src.substr(src.lastIndexOf('.') + 1)
}

function _getFileName (src) {
    return src.substr(src.lastIndexOf('/') + 1)
}

var _class = function () {
    function _class() {
        var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        var def = {
            filter: new RegExp('\.(jpg|png|jpeg)$'),
            config: {
                jpg: {},
                png: { quality: '65-80' }
            }
        };

        this.setting = Object.assign({}, def, c);
    }

    _class.prototype.apply = function apply(op) {

        var setting = this.setting;
        var webImageReg = /\/web-images\//g;

        if (setting.filter.test(op.file) && webImageReg.test(op.file)) {
            op.output && op.output({
                action: 'hash file',
                file: op.file
            });

            let hash = md5File.sync(op.file)
            let data = fs.readFileSync(op.file)
            let filePath = op.file

            op.file = op.file.replace('src/', '').replace(_getExt(op.file), `${hash.substring(0, 6)}.${_getExt(op.file)}`)
            op.code = data
            console.log(op.file);
            op.next();

            fileList[_getFileName(filePath)] = _getFileName(op.file)

            return
        }

        if (setting.replaceFilter.test(op.file)) {
            console.log(op.file, fileList);
            var key = 'IMAGE_PATH'
            var nameReg = new RegExp("[\'\"]" + key + "\/([^\'\"]*)[\'\"]", "g")
            op.code = op.code.replace(nameReg, (match, p1, offset, string) => {
                console.log(match, p1, offset)
                console.log(match.replace(p1, fileList[p1]))
                return match.replace(p1, fileList[p1])
            })
            op.next();
            return
        }

        op.next();
        return
    };

    return _class;
}();

exports.default = _class;