function execute(url) {
    var doc = fetch(url).html();
    var el = doc.select(".list-image-detail .page-chapter img");   
    var data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        data.push(e.attr("src"));     
    }
    return Response.success(data);
}