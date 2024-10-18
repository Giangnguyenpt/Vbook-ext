load('config.js');

function execute(url, page) {
    url = url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
    if (!page) page = '1';
    const doc = fetch(BASE_URL + url + "?page=" + page).html();
    const el = doc.select(".item-manga");
    const data = [];
    for (var i = 0; i < el.size(); i++) {
        var e = el.get(i);
        var coverImg = e.select(".image-item img").first();
        var coverSrc = coverImg.attr("src");
        var coverDataOriginal = coverImg.attr("data-original");

        // Chọn URL của ảnh từ data-original nếu src là image_default.png
        if (coverSrc && coverSrc.includes("image_default.png") && coverDataOriginal) {
            coverSrc = coverDataOriginal;
        }
        
        data.push({
            name: e.select(".caption h3 a").first().text(),
            link: e.select(".caption h3 a").first().attr("href"),
            cover: coverSrc,
            description: e.select(".caption ul li").first().text(),
            host: BASE_URL || BASE_URL1
        });
    }
    var next = parseInt(page, 10) + 1;
    return Response.success(data, next.toString());
}