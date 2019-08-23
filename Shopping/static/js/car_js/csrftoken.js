var csrftoken = "";

function getToken() {
	if (typeof String.prototype.endsWith != 'function') {
        String.prototype.endsWith = function(suffix) {
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }
	
	var url = document.domain;
	var wDomain = ".vmall.com;.hicloud.com";
	var wds = wDomain.split(";");
	
	for(var i = 0;i<wds.length; i++) {
		var wd = wds[i];
		var isDomain = url.endsWith(wd);
		
		if (isDomain) {
			csrftoken = "0C178FB03EA639E750C5F54E89A33B2A2A18D52389B7E52D";
			break;
		}
	}
}

getToken();