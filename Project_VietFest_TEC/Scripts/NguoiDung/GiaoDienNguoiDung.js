load_data()
load_full_data()
async function load_data() {
    const res = await $.ajax({
        url: '/api/load_san_pham',
        type: 'GET'
    });
    $("#show_nav").empty();
    $(".tab-content").empty();
    $("#show_nav").append(`
            <li class="nav-item">
                <a class="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-all">
                    <span class="text-dark" style="width: 130px;">Tất cả</span>
                </a>
            </li>
        `);

    $(".tab-content").append(`
            <div id="tab-all" class="tab-pane fade show active p-0">
                <div class="row g-4" id="content-all"></div>
            </div>
        `);

    res.data.forEach((category, index) => {
        const tabId = `tab-${index + 1}`;

        $("#show_nav").append(`
                <li class="nav-item">
                    <a class="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#${tabId}">
                        <span class="text-dark" style="width: 130px;">${category.danh_muc_san_pham}</span>
                    </a>
                </li>
            `);

        $(".tab-content").append(`
                <div id="${tabId}" class="tab-pane fade p-0">
                    <div class="row g-4" id="content-${tabId}"></div>
                </div>
            `);

        category.san_pham.forEach(product => {
            const productHtml = `
                    <div class="col-md-6 col-lg-4 col-xl-3">
                        <div class="rounded position-relative fruite-item">
                            <div class="fruite-img">
                                <img src="/assets/img_san_pham/${product.img}" class="img-fluid w-100 rounded-top" alt="${product.ten_san_pham}">
                            </div>
                            <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">
                                ${category.danh_muc_san_pham}
                            </div>
                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>${product.ten_san_pham}</h4>
                                <p>${product.mo_ta || "XXX"}</p>
                                <div class="d-flex justify-content-between flex-lg-wrap">
                                    <p class="text-dark fs-5 fw-bold mb-0">${product.gia != null ? product.gia + " VNĐ" : "XXX VNĐ"}</p>
                                    <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary">
                                        <i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            $(`#content-${tabId}`).append(productHtml);
            $(`#content-all`).append(productHtml);
        });
    });
}


async function load_full_data() {
    const res = await $.ajax({
        url: '/api/load_full_san_pham',
        type: 'GET'
    });
}