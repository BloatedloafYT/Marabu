function Theme()
{
  this.el = document.createElement("style");
  this.active = null;

  this.collection = {};
  this.collection.blanc = { background:"#eee",f_high:"#111",f_med:"#999",f_low:"#bbb",f_inv:"#fff",f_inv:"#000",b_high:"#000",b_med:"#999",b_low:"#ddd",b_inv:"#999",b_inv:"#72dec2" };
  this.collection.noir = { background: "#000", f_high: "#fff", f_med: "#999", f_low: "#555", f_inv: "#000", f_inv: "#000", b_high: "#000", b_med: "#555", b_low: "#222", b_inv: "#fff", b_inv: "#72dec2" };
  this.collection.pale = { background: "#555", f_high: "#fff", f_med: "#999", f_low: "#bbb", f_inv: "#555", f_inv: "#555", b_high: "#000", b_med: "#999", b_low: "#666", b_inv: "#fff", b_inv: "#ccc" };

  this.start = function()
  {
    if(localStorage.theme && is_json(localStorage.theme)){
      console.log("Theme","Found in localStorage")
      this.install(JSON.parse(localStorage.theme));  
    }
    else{
      console.log("Theme","Creating new")
      this.install(this.collection.noir);
    }
  }

  this.save = function()
  {
    localStorage.setItem("theme", JSON.stringify(this.active));
    console.log("Theme","Saved");
  }

  this.load = function(theme_str)
  {
    if(is_json(theme_str)){
      this.install(JSON.parse(theme_str));
    }
    else if(this.collection[theme_str]){
      this.install(this.collection[theme_str]);
    }
    console.log("Theme","Loaded");
  }

  this.install = function(theme)
  {
    var html = "";

    this.active = theme;

    marabu.song.song().theme = theme;

    html += "body { background:"+theme.background+" !important }\n";
    html += ".fh { color:"+theme.f_high+" !important; stroke:"+theme.f_high+" !important }\n";
    html += ".fm { color:"+theme.f_med+" !important ; stroke:"+theme.f_med+" !important }\n";
    html += ".fl { color:"+theme.f_low+" !important ; stroke:"+theme.f_low+" !important }\n";
    html += ".f_inv { color:"+theme.f_inv+" !important ; stroke:"+theme.f_inv+" !important }\n";
    html += ".f_inv { color:"+theme.f_inv+" !important ; stroke:"+theme.f_inv+" !important }\n";
    html += ".bh { background:"+theme.b_high+" !important; fill:"+theme.b_high+" !important }\n";
    html += ".bm { background:"+theme.b_med+" !important ; fill:"+theme.b_med+" !important }\n";
    html += ".bl { background:"+theme.b_low+" !important ; fill:"+theme.b_low+" !important }\n";
    html += ".b_inv { background:"+theme.b_inv+" !important ; fill:"+theme.b_inv+" !important }\n";
    html += "#editor { border-left-color: "+theme.b_low+" }\n";
    html += "#instrument { border-left-color: "+theme.b_low+" }\n";
    html += "#scrollbar { background: "+theme.b_med+" }\n";
    
    this.el.innerHTML = html;
    this.save();
  }

  this.reset = function()
  {
    console.log("Theme","reset");
    this.install(this.collection.noir);
  }

  function is_json(text)
  {
    try{
      JSON.parse(text);
      return true;
    }
    catch (error){
      return false;
    }
  }
}