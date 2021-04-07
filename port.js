
console.log(saveAs);

function ExportChoices()
{
	var r = {};
	for (var i = 0; i < window.localStorage.length; i++)
	{
		var k = window.localStorage.key(i);
		r[k] = localStorage.getItem(k);
	}
	var s = JSON.stringify(r, null, 2);
	var b = new Blob([s], { type: "text/plain;charset=utf-8" });
	saveAs(b, "bsse-component-choices.json");
	return r;
}

function ImportChoices(j)
{
	var fileInputElement = document.querySelector("#import-choices-file");
	var file = fileInputElement.files[0];
	if (!file) return;

	return new Promise(function(resolve, reject)
	{
		let reader = new FileReader();
		// event fired when file reading finished
		reader.addEventListener('load', function(e) {
		   // contents of the file
			let text = e.target.result;

			var j = JSON.parse(text);
			for (var k in j)
			{
				window.localStorage.setItem(k, j[k]);
			}
			resolve(true);
		});

		// event fired when file reading failed
		reader.addEventListener('error', function() {
			reject("Failed to read file.");
		});

		// read file as text file
		reader.readAsText(file);
	});
}
