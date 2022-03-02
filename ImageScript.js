const __Obl__  = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAACmklEQVR4Xu2aMU7DQBBF7SJ1OAE9FQUSSFyBgiPkJAhHnCQ9FBRcAQkkCir63ICWFEZEggons/4/Zhxe6pnx5r2d2bWSuuKTikCdajUspkJIsk2AEIQkI5BsOXQIQpIRSLYcOgQhyQgkWw4dgpBkBJIthw5BSDICyZZDhyAkGYFky6FDEJKMQLLl0CEISUYg2XJG2SGvLxftrjkenzz8CRvbQ1dPi2bXkCZns/UzEBIgvXpe7HzXTk5n6w2EEIQECHhCfCOLDrEYQUgHxvEf6nQIHWIhQIf0x8gtq4Ad194CWBtCOdQZWf13EiOrgB0jqwAWI6scFu8hAWaMrACk7xBGVgEsRlY5LEZWgBkjKwCJkVUAKRDKiyEvhoFt0hHCyCpgxy2rABa3rHJY3LICzBhZAUjcsgogBUK5Ze3tLYs/ygX2//YQW4dsf5Qvgj/K+VhaKiFExHj/9t7UdX0tlvlJn37cVgerO1e5X+uM/tq7iQ5C4ntnkDMEIQiJE9jXay8jS94D6wKMLDpE30ncskSGHOpxgIwsRlZ8t3RFMrJEhoysOMBRjqy2beeXR9Mm/jXHE4mQZK4QghCdACNLZOg+1BGCEJFAPJ0zJM5qkEiEDII5/hCExFkNEjmIEOc3uTk/bOrK9/u8c21ftdqqnV89Lnu/tCLEbAQhZqBqOYSoBM35CDEDVcshRCVozkeIGahaDiEqQXM+QsxA1XIIUQma8xFiBqqWQ4hK0JyPEDNQtRxCVILmfISYgarlEKISNOcjxAxULYcQlaA5HyFmoGo5hKgEzfn/ToiZX7pyo/tNPR1B84IQYgaqlkOIStCcjxAzULUcQlSC5nyEmIGq5RCiEjTnI8QMVC2HEJWgOR8hZqBqOYSoBM35n+2XCIMJ4ipeAAAAAElFTkSuQmCC
`
var image = new Image()
image.src=__Obl__
image.onload = function() {
  var fon = document.getElementById("background")
  var color = "rgba(255,255,255,0.96)"
  var element = document.body
  for(var i =0; i < fon.attributes.length; i++) {
   if(fon.attributes[i].name == "color") { color=fon.attributes[i].value }
   if(fon.attributes[i].name == "element") { element = eval(fon.attributes[i].value)  }
  }
 this.correct(color,function(res) {
   var result= "url('" + res + "')"
   element.style.backgroundImage=result
    })
 };
  
Image.prototype.correct = function(Color,callback) {
  var canv = document.createElement('canvas')
  var c = canv.getContext('2d')
  c.canvas.width = this.width
  c.canvas.height = this.height
  c.drawImage(this,0,0)
  c.fillStyle = Color
  c.fillRect(0,0,c.canvas.width,c.canvas.height)
  c.canvas.toBlob(function(blob) {
  var result =  URL.createObjectURL(blob)
  callback(result)
   })
 };  