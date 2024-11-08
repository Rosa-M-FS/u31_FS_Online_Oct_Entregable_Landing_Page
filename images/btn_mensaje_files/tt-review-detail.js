// 评论详情弹窗所需要的各个值
const TTRevDetail = {
	reviewsData: {},
	resources: [],
	showType: null,
	pageNo: null,
	pageCount: null,
	pageSize: 15,
	revDetail: null,
	preBtn: null,
	nextBtn: null,
	reviewLists: [],
	isLoading: false,
	lastPageSize: 0,
	isInserted: false,
	detailCloseEvent: new CustomEvent("onTrustooDetailClose", {
		detail: {},
		bubbles: true,
		cancelable: true,
	}),

	// Mark 嵌入评论详情弹窗
	insertTTReviewDetail(v) {
		if (TTRevDetail.revDetail) {
			return;
		} else {
			TTRevDetail.isInserted = true;
		}
		let { reviewsData } = TTRevDetail;
		let powerStr = `<div class="trustoo-power"></div>`;
		let relatePro = "";
		var ttSty = document.createElement("link");
		ttSty.rel = "stylesheet";
		let link = "";
		if (v.env === "local") {
			link = "../css/module/tt-review-detail.min.css";
		} else {
			link =
				"https://" +
				v.staticBaseUrl +
				"/static/css/module/tt-review-detail.min.css?" +
				v.constructTime;
		}
		ttSty.href = link;
		document.head.appendChild(ttSty);

		relatePro = `
      <div class="product-info">
        <div class="product-image"></div>
        <div>
          <div class="tt-product-name"></div>
          <div class="product-shop">
          </div>
        </div>
      </div>`;
		const revDetailHtml = ` <div id="trustoo-review-detail" style="display:none;--photo-radius:${
			v.userSetting.photo_radius || 0
		}px" class="trustoo-widget">
    <div class="close-wrapper"><svg xmlns="http://www.w3.org/2000/svg" style="width: 18px;height: 18px;" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path d="M10.2732 9.00016L15.9369 3.33646C16.1057 3.1677 16.2005 2.93882 16.2005 2.70016C16.2005 2.4615 16.1057 2.23261 15.9369 2.06386C15.7682 1.8951 15.5393 1.80029 15.3006 1.80029C15.062 1.80029 14.8331 1.8951 14.6643 2.06386L9.00065 7.72756L3.33695 2.06386C3.25339 1.9803 3.15418 1.91401 3.04501 1.86879C2.93583 1.82357 2.81882 1.80029 2.70065 1.80029C2.58247 1.80029 2.46546 1.82357 2.35628 1.86879C2.24711 1.91401 2.14791 1.9803 2.06435 2.06386C1.89559 2.23261 1.80078 2.4615 1.80078 2.70016C1.80078 2.93882 1.89559 3.1677 2.06435 3.33646L7.72805 9.00016L2.06435 14.6639C1.89559 14.8326 1.80078 15.0615 1.80078 15.3002C1.80078 15.5388 1.89559 15.7677 2.06435 15.9365C2.2331 16.1052 2.46199 16.2 2.70065 16.2C2.9393 16.2 3.16819 16.1052 3.33695 15.9365L9.00065 10.2728L14.6643 15.9365C14.7477 16.0203 14.8469 16.0869 14.9561 16.1323C15.0653 16.1777 15.1824 16.2011 15.3006 16.2011C15.4189 16.2011 15.536 16.1777 15.6452 16.1323C15.7544 16.0869 15.8536 16.0203 15.9369 15.9365C16.0206 15.8529 16.087 15.7538 16.1322 15.6446C16.1775 15.5354 16.2008 15.4184 16.2008 15.3002C16.2008 15.182 16.1775 15.0649 16.1322 14.9557C16.087 14.8465 16.0206 14.7474 15.9369 14.6639L10.2732 9.00016Z" fill="white"/>
		</svg></div>
      <div class="media-swiper">
        <div class="image-btn-wrapper pre-btn-wrapper"><div class="tt-review_detail_pre_image"></div></div>
        <div class="image-btn-wrapper next-btn-wrapper"><div class="tt-review_detail_next_image"></div></div>
        <script src="https://embed.cloudflarestream.com/embed/sdk.latest.js" defer="true"></script>
        <video class="tt-detail-video" style="display:none" type="video/mp4,video/wmv, video/avi, video/mp4, video/flv,
          video/3gp, video/mov, video/mkv, video/vob" autoplay  controls></video>
					<iframe src="" class="tt-detail-frame"
				style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;display:none";
				allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
      </div>

    <div class="review-detail">
        <div class="review-info" ></div>
        ${relatePro}
    </div>
        ${powerStr}
  </div>`;
		if (!TTRevDetail.dqs("#trustoo-mask")) {
			document.body.insertAdjacentHTML(
				"beforeend",
				'<div id="trustoo-mask" style="display:none"></div>'
			);
		}
		TTRevDetail.dqs("#trustoo-mask").insertAdjacentHTML(
			"beforeend",
			revDetailHtml
		);
		const revDetail = TTRevDetail.dqs("#trustoo-review-detail");
		TTRevDetail.revDetail = v.revDetail = revDetail;
		const onTTDetailEmbed = new CustomEvent("onTTDetailEmbed", {
			detail: {
				v: TTRevDetail,
			},
			bubbles: true,
			cancelable: true,
		});
		document.dispatchEvent(onTTDetailEmbed);

		TTRevDetail.dqs(".close-wrapper", revDetail).onclick = function () {
			if (
				location.href.indexOf("tt-reviews-detail-open") !== -1 &&
				v.isMobile
			) {
				window.history.replaceState(
					{},
					document.title,
					window.location.href.replace("#tt-reviews-detail-open", "")
				);
			}
			TTRevDetail.closeTTDetail(v);
		};

		TTRevDetail.dqs(".review-info", revDetail).onclick = function (e) {
			const target = e.target;
			if (target.tagName === "IMG") {
				TTRevDetail.changeTTDetailImagesActive(
					target,
					target.getAttribute("alt")
				);
				TTRevDetail.switchImgVisibleStatus(
					v.revDetailInfo.imageIndex,
					v.revDetailInfo.no,
					"click"
				);
			} else if (target.classList.contains("resource-item")) {
				// ## 图片预览点击
				const imgNode = TTRevDetail.dqs("img", target);
				TTRevDetail.changeTTDetailImagesActive(
					imgNode,
					imgNode.getAttribute("alt")
				);
				TTRevDetail.switchImgVisibleStatus(
					v.revDetailInfo.imageIndex,
					v.revDetailInfo.no,
					"click"
				);
			}
		};
		// Mark 上一页按钮点击事件
		TTRevDetail.preBtn = TTRevDetail.dqs(".pre-btn-wrapper", revDetail);
		TTRevDetail.preBtn.onclick = async function () {
			if (TTRevDetail.isLoading) {
				return;
			}
			const v = reviewsData;
			const info = v.revDetailInfo;
			isSwitch = false;

			if (info.imageIndex - 1 >= 0) {
				info.imageIndex--;
				TTRevDetail.switchImgVisibleStatus(info.imageIndex, info.no, "pre");
			} else {
				if (TTRevDetail.showType === "trustoo_swiper_review") {
					info.imageIndex = TTRevDetail.resources.length - 1;
				} else {
					// 评论跨页
					isSwitch = true;
					await TTRevDetail.switchReview("pre");
				}
			}
			if (!isSwitch) {
				const target = TTRevDetail.dqs(
					`img[alt="${info.imageIndex}"]`,
					revDetail
				);
				TTRevDetail.changeTTDetailImagesActive(target, info.imageIndex);
			}
		};
		// Mark 下一页按钮点击事件
		TTRevDetail.nextBtn = TTRevDetail.dqs(".next-btn-wrapper", revDetail);
		TTRevDetail.nextBtn.onclick = async function () {
			if (TTRevDetail.isLoading) {
				return;
			}
			const info = reviewsData.revDetailInfo;
			isSwitch = false;

			if (info.imageIndex + 1 < TTRevDetail.resources.length) {
				info.imageIndex++;
				TTRevDetail.switchImgVisibleStatus(info.imageIndex, info.no, "next");
			} else {
				if (TTRevDetail.showType === "trustoo_swiper_review") {
					info.imageIndex = 0;
				} else {
					// 评论跨页
					isSwitch = true;
					await TTRevDetail.switchReview("next");
				}
				// info.imageIndex = 0;;
			}
			if (!isSwitch) {
				const target = TTRevDetail.dqs(
					`img[alt="${info.imageIndex}"]`,
					revDetail
				);
				TTRevDetail.changeTTDetailImagesActive(target, info.imageIndex);
			}
		};
		// 点击空白地方关闭弹窗
		window.addEventListener("click", function (e) {
			const mask = TTRevDetail.dqs("#trustoo-mask");
			if (
				mask &&
				mask.contains(e.target) &&
				!revDetail.contains(e.target) &&
				revDetail.style.display === "flex"
			) {
				if (
					location.href.indexOf("tt-reviews-detail-open") !== -1 &&
					reviewsData.isMobile
				) {
					window.history.replaceState(
						{},
						document.title,
						window.location.href.replace("#tt-reviews-detail-open", "")
					);
				}
				TTRevDetail.closeTTDetail(v);
			}
		});
		window.addEventListener("hashchange", function () {
			// 在这里执行处理哈希变化的自定义代码
			var newHash = window.location.hash;
			if (
				newHash.indexOf("tt-reviews-detail-open") === -1 &&
				revDetail.getAttribute("data-opened")
			) {
				TTRevDetail.closeTTDetail(v);
			}
		});
	},

	// Mark 显示评论详情弹窗
	showTTReviewDetail(v, html = "", data, type) {
		let { pageNo, revDetail } = TTRevDetail;
		let resources = null;
		TTRevDetail.showType = type;
		Object.assign(TTRevDetail.reviewsData, v);
		const revInfo = TTRevDetail.dqs(".review-info", revDetail);
		const media = TTRevDetail.dqs(".media-swiper", revDetail);
		let h = 0;
		if (data.corresponding_product !== null) {
			h = 101;
		}
		if (v.userSetting.is_del_powered === 2) {
			if (v.isMobile) {
				h += 30;
			}
			TTRevDetail.dqs(".trustoo-power", revDetail).innerHTML = `Powered by 
			<a class="redirect" target="_blank" href="https://www.trustoo.io/"
			>Trustoo.io</a><span class="line"></span><a class="tt-power-cw" href="https://www.channelwill.com/" target="_blank"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="tt-cw">
			<rect x="1.53711" y="1.39551" width="8.99951" height="8.99951" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M3.32765 2.73501e-06C2.8905 -0.000558075 2.45754 0.0851314 2.05355 0.252163C1.64957 0.419194 1.28251 0.664286 0.973399 0.973399C0.664286 1.28251 0.419194 1.64957 0.252163 2.05355C0.0851314 2.45754 -0.000558075 2.8905 2.73501e-06 3.32765V8.67235C2.73501e-06 9.5549 0.350594 10.4013 0.97465 11.0254C1.59871 11.6494 2.44511 12 3.32765 12H8.67235C9.55409 11.9998 10.3997 11.6497 11.0236 11.0266C11.6475 10.4035 11.9986 9.55835 12 8.67661V3.32765C11.9989 2.44658 11.6484 1.60192 11.0254 0.978908C10.4023 0.355895 9.55768 0.00539091 8.67661 0.00426349L3.32765 2.73501e-06ZM6 10C6.79698 9.99949 7.57568 9.76122 8.23648 9.31568C8.89728 8.87014 9.41013 8.23758 9.70942 7.49894H7.8202C7.4845 7.90174 7.03062 8.18877 6.5228 8.31938C6.01498 8.45 5.47894 8.4176 4.99055 8.22676C4.50216 8.03592 4.08616 7.69631 3.80143 7.256C3.51669 6.81569 3.37766 6.29698 3.40399 5.77329C3.43032 5.2496 3.62069 4.74746 3.94816 4.33793C4.27562 3.92841 4.72359 3.63224 5.22866 3.49136C5.73373 3.35047 6.27032 3.372 6.76248 3.55291C7.25464 3.73381 7.67743 4.06491 7.97103 4.49936H9.70942C9.43743 3.82626 8.98741 3.23985 8.4076 2.80297C7.82778 2.36609 7.14002 2.0952 6.41801 2.01935C5.696 1.94349 4.96696 2.06552 4.30901 2.37235C3.65106 2.67919 3.08899 3.15927 2.68305 3.76115C2.2771 4.36303 2.04257 5.06402 2.0046 5.78901C1.96662 6.514 2.12662 7.23565 2.46746 7.87665C2.8083 8.51765 3.31713 9.05383 3.93942 9.42773C4.56172 9.80163 5.27402 9.99916 6 9.99915V10Z" fill="#444"/>
			</svg></a>`;
		}

		if (!revDetail.getAttribute("data-opened")) {
			revDetail.setAttribute("data-opened", 1);
		}

		if (v.isMobile) {
			let vhNum = 40;
			if (data.resources.length === 0) {
				vhNum = 100;
			}
			revInfo.style.height = `calc(${vhNum}vh - ${h}px)`;
			if (data.corresponding_product !== null) {
				media.style.height = `calc(60vh - ${h}px)`;
			} else {
				media.style.height = "60vh";
			}
		} else {
			revInfo.style.height = 600 - h + "px";
			media.style.height = "600px";
		}
		if (v.isMobile) {
			window.location.hash = "tt-reviews-detail-open";
		}
		revDetail.setAttribute("type", type);
		if (html === "") {
			html = TTRevDetail.getTTDetailReviewInfo(data);
		}

		TTRevDetail.resources = resources = data.resources.slice();

		// 不知道当前评论处于图片评论列表哪一页，说明是点击进来的，不是跨页进来的
		if (pageNo === null && type !== "trustoo_swiper_review") {
			TTRevDetail.getTTDetailReviewsList(data.id);
		}

		revInfo.innerHTML = html;
		const info = data.corresponding_product;
		if (info) {
			let proName = info.product_name;
			if (proName.length > 50) {
				proName = proName.substring(0, 50) + "...";
			}

			TTRevDetail.dqs(".tt-product-name", revDetail).innerHTML = proName;
			TTRevDetail.dqs(
				".product-image",
				revDetail
			).style.backgroundImage = `url(${info.product_image})`;
			const proShop = TTRevDetail.dqs(".product-shop", revDetail);
			const linkBtn = TTRevDetail.dqs(".product-shop>a", revDetail);
			// 全部评论且开启后嵌入关联产品，通过读取属性实现文本自定义
			if (linkBtn) {
				linkBtn.href = info.product_url;
			} else {
				const curLang =
					v.userSetting.auto_switch_language === 1
						? (Shopify && Shopify.locale) || "en"
						: v.userSetting.language;
				const showNowText =
					proShop.getAttribute("text") ||
					TTRevDetail.shopNow[curLang] ||
					"Show Now";
				proShop.insertAdjacentHTML(
					"afterbegin",
					`<a target="_Blank" href="${info.product_url}">
						<span class="tt-shop"></span><span>${showNowText}</span>
					</a>`
				);
			}

			TTRevDetail.dqs(".product-info", revDetail).style.display = "flex";
		}

		TTRevDetail.dqs(".reviews-text,.tt-card-body", revDetail).innerHTML =
			data.content;
		TTRevDetail.dqsa(".resource-list img", revDetail).forEach(it => {
			it.onerror = function () {
				const inx = this.getAttribute("alt");
				resources.splice(inx, 1);
				it.closest(".resource-item").remove();
				if (inx == 0) {
					TTRevDetail.changeTTDetailImagesActive(
						TTRevDetail.dqs(".resource-list img", revDetail),
						0
					);
				}

				if (resources.length === 1) {
					if (type === "trustoo_swiper_review") {
						TTRevDetail.dqs(".media-swiper", revDetail).classList.add(
							"hide-btn"
						);
					}
				} else {
					TTRevDetail.dqsa(".resource-list img", revDetail).forEach(
						(it, inx) => {
							it.setAttribute("index", inx);
							it.setAttribute("alt", inx);
						}
					);
				}
			};
		});
		const multiPhotoIcon = TTRevDetail.dqs(".multi-photo-wrapper", revDetail);
		multiPhotoIcon && multiPhotoIcon.remove();

		document.body.classList.add("trustoo-open");
		TTRevDetail.dqs("#trustoo-mask").style.display = "flex";

		let d = "block";
		let cls = "has-image";
		revDetail.classList.remove("no-image");
		if (resources.length === 0) {
			cls = "no-image";
			d = "none";
		} else if (resources.length > 1) {
			media.classList.remove("hide-btn");
		} else {
			TTRevDetail.dqs(".resource-list", revDetail).remove();
			if (type === "trustoo_swiper_review") {
				media.classList.add("hide-btn");
			}
		}
		if (resources.length > 0) {
			const imageIndex = v.revDetailInfo.imageIndex;
			this.switchResourceShow(resources[imageIndex], media);
			const nodes = TTRevDetail.dqsa(".resource-item", revDetail);
			nodes.forEach(itm => {
				child = itm.children[0];
				child.style.display = "block";
				if (itm.getAttribute("proportion") > 1) {
					child.style.height = "100%";
				} else {
					child.style.width = "100%";
				}
			});
			if (resources.length > 1) {
				TTRevDetail.dqs(
					`img[alt="${imageIndex}"]`,
					revDetail
				).parentNode.classList.add("active");
			}
		}
		revDetail.className = "trustoo-widget " + cls;
		revDetail.style.display = "flex";
		if (v.scenes === "detail" && typeof trustooAfterExecute !== "undefined") {
		}
		media.style.display = d;
	},

	// ## 大媒体展示切换
	switchResourceShow(resource, media) {
		const revDetail = TTRevDetail.revDetail;
		const iframe = TTRevDetail.dqs(".tt-detail-frame", revDetail);
		const video = TTRevDetail.dqs(".tt-detail-video", revDetail);
		video.style.display = iframe.style.display = "none";
		iframe.src = video.src = "";
		if (resource.resource_type === 2) {
			if (resource.video_player_url) {
				iframe.style.display = "block";
				iframe.src = resource.video_player_url + "?autoplay=true";
			} else if (resource.src) {
				const video = TTRevDetail.dqs(".tt-detail-video", revDetail);
				video.style.display = "block";
				video.src = resource.src;
			}
		} else if (resource.resource_type === 1) {
			// let imgSty = `background-image:url(${resource.src});`;
			// imgSty += TTRevDetail.getTTDetailImageStyle(resource);
			// console.log("imgSty", imgSty);
			const width = resource.width,
				height = resource.height;

			let size = "100% auto";

			const p = parseFloat((width / height).toFixed(1));
			if (p >= 0.7 && p <= 1) {
				size = "cover";
			} else if (width <= height) {
				size = "auto 100%";
			}

			let color = resource.average_hue || "#cec9b6";
			media.style.backgroundColor = color;
			media.style.backgroundSize = size;
			media.style.backgroundImage = `url(${resource.src})`;
		}
	},

	// Mark 切换评论
	async switchReview(type) {
		let { reviewsData, showType, pageNo, pageCount, revDetail, reviewLists } =
			TTRevDetail;
		const v = reviewsData;
		// const revDetail = TTRevDetail.dqs("#trustoo-review-detail");
		let no = v.revDetailInfo.no;

		if (type === "pre") {
			if (no === 0) {
				pageNo--;
				no = 14;
			} else {
				no--;
			}
		} else if (type === "next") {
			if (no === 14) {
				pageNo++;
				no = 0;
			} else {
				no++;
			}
		}

		let previewPageNo = null;
		if (no === 13 && previewPageNo < pageCount) {
			previewPageNo = pageNo + 1;
		} else if (no === 2 && pageNo > 1) {
			previewPageNo = pageNo - 1;
		}
		TTRevDetail.pageNo = pageNo;
		if (
			previewPageNo &&
			previewPageNo <= pageCount &&
			typeof reviewLists[previewPageNo - 1] === "undefined"
		) {
			TTRevDetail.getTTDetailReviewsList("", previewPageNo);
		}

		v.revDetailInfo.no = no;

		if (revDetail.classList.contains("has-video")) {
			TTRevDetail.dqs(".tt-detail-frame", revDetail).style.display = "none";
			revDetail.classList.remove("has-video");
		}
		const d = await TTRevDetail.getReview(no);
		if (type === "pre") {
			v.revDetailInfo.imageIndex = d.resources.length - 1;
		} else if (type === "next") {
			v.revDetailInfo.imageIndex = 0;
		}

		TTRevDetail.dqs(".media-swiper", revDetail).style.backgroundImage = "none";
		TTRevDetail.showTTReviewDetail(v, "", d, showType);
		TTRevDetail.switchVisibleStatus(no, type, d.resources.length);
	},

	async getReview(no) {
		let { pageNo, reviewLists } = TTRevDetail;
		let d = null;
		if (typeof reviewLists[pageNo - 1] !== "undefined") {
			d = reviewLists[pageNo - 1][no];
		} else {
			TTRevDetail.isLoading = true;
			const list = await TTRevDetail.getTTDetailReviewsList("", pageNo);
			TTRevDetail.isLoading = false;
			d = list[no];
		}
		return d;
	},

	// Mark 获取评论
	async getTTDetailReviewsList(reviewId = "", reqPageNo = 0) {
		let { reviewsData, resources, showType, pageNo, pageCount, reviewLists } =
			TTRevDetail;
		let isBuyersShow = 2;
		let sortType = "image-descending",
			ratingFilter = 0;
		const v = reviewsData;
		if (showType === "trustoo_buyers_show") {
			isBuyersShow = v.buyersShowType;
		}

		if (["trustoo_reviews", "trustoo_all_reviews"].includes(showType)) {
			sortType = (v.isWdoRevOpen ? v.wdoRevDom : v.reviewsDom).getAttribute(
				"review_sort_by"
			);
			ratingFilter = (v.isWdoRevOpen ? v.wdoRev : v.reviews).ratingFilter;
		}

		return v
			.getRevList(
				sortType,
				ratingFilter,
				reqPageNo,
				15,
				isBuyersShow,
				true,
				reviewId
			)
			.then(res => {
				const d = res[1];
				if (!pageNo) {
					pageNo = TTRevDetail.pageNo = d.page.cur_page;
					pageCount = TTRevDetail.pageCount = d.page.total_page;
					if (pageNo === pageCount) {
						TTRevDetail.pageSize = d.list.length;
					}
				}
				if (d.page.cur_page === pageCount) {
					TTRevDetail.lastPageSize = d.list.length;
				}
				if (reviewId) {
					const no = (v.revDetailInfo.no = d.list.findIndex(it => {
						return it.id == reviewId;
					}));
					let previewPageNo = null;
					if (no >= 13 && pageNo < pageCount) {
						previewPageNo = pageNo + 1;
					} else if (no <= 2 && pageNo > 1) {
						previewPageNo = pageNo - 1;
					}
					if (previewPageNo) {
						TTRevDetail.getTTDetailReviewsList("", previewPageNo);
					}
					TTRevDetail.switchVisibleStatus(no, "click", resources.length);
				}
				reviewLists[d.page.cur_page - 1] = d.list;
				return d.list;
			});
	},

	//Mark 切换评论按钮显示状态切换
	switchVisibleStatus(no, type, resourceCount) {
		let {
			reviewsData,
			pageNo,
			pageCount,
			pageSize,
			lastPageSize,
			preBtn,
			nextBtn,
		} = TTRevDetail;
		const info = reviewsData.revDetailInfo;
		if (no === 0 && pageNo === 1 && info.imageIndex === 0) {
			preBtn.style.display = "none";
		} else if (no === 1 && pageNo === 1 && type === "next") {
			preBtn.style.display = "flex";
		}
		if (
			no === lastPageSize - 1 &&
			pageNo === pageCount &&
			info.imageIndex + 1 === resourceCount
		) {
			nextBtn.style.display = "none";
		} else if (
			no === lastPageSize - 2 &&
			pageNo === pageCount &&
			type === "pre"
		) {
			nextBtn.style.display = "flex";
		}
	},

	// Mark 图片切换按钮显示状态切换
	switchImgVisibleStatus(index, no, type) {
		let { resources, pageNo, pageCount, pageSize, preBtn, nextBtn } =
			TTRevDetail;
		if (
			((index === 1 && type === "next") || (index !== 0 && type === "click")) &&
			pageNo === 1 &&
			no === 0
		) {
			preBtn.style.display = "flex";
		} else if (index === 0 && pageNo === 1 && no === 0) {
			preBtn.style.display = "none";
		}
		if (
			index + 1 === resources.length &&
			pageNo === pageCount &&
			no === this.lastPageSize - 1
		) {
			nextBtn.style.display = "none";
		} else if (
			((index + 2 === resources.length && type === "pre") ||
				(index + 1 !== resources.length && type === "click")) &&
			pageNo === pageCount &&
			no === this.lastPageSize - 1
		) {
			nextBtn.style.display = "flex";
		}
	},

	// Mark 关闭弹窗
	closeTTDetail(v) {
		let { showType, revDetail } = TTRevDetail;
		TTRevDetail.pageNo = null;
		revDetail.parentNode.style.display = "none";
		TTRevDetail.dqs(".review-info", revDetail).innerHTML = "";
		TTRevDetail.dqsa(".tt-detail-frame,.tt-detail-video", revDetail).forEach(
			it => {
				it.src = "";
				it.style.display = "none";
			}
		);
		if (showType !== "trustoo_swiper_review") {
			TTRevDetail.dqsa(".image-btn-wrapper", revDetail).forEach(
				it => (it.style.display = "flex")
			);
		}

		TTRevDetail.dqs(".media-swiper", revDetail).style.backgroundImage = "none";
		revDetail.style.display = "none";
		document.body.classList.remove("trustoo-open");
		TTRevDetail.dqs(".product-info", revDetail).style.display = "none";
		TTRevDetail.dqs(".product-info .product-shop", revDetail).innerHTML = "";
		TTRevDetail.dqs(".media-swiper", revDetail).classList.remove("hide-btn");
		TTRevDetail.revDetail.removeAttribute("data-opened");
		v.revDetailInfo.imageIndex = 0;
		document.dispatchEvent(TTRevDetail.detailCloseEvent);
	},

	getTTDetailImageStyle(image) {
		const width = image.width,
			height = image.height;

		const average_hue = image.average_hue;
		const bdc = average_hue ? average_hue : "#cec9b6";

		let style = "";
		if (width > height) {
			style = "background-size:100% auto;";
		} else {
			const p = parseFloat((width / height).toFixed(1));
			if (p >= 0.7 && p <= 1) {
				style = "background-size:100% auto;";
			} else {
				style = "background-size:auto 100%;";
			}
		}
		style += `background-color:${bdc};`;
		return style;
	},

	changeTTDetailImagesActive(target, index) {
		let { reviewsData, resources, revDetail } = TTRevDetail;
		const activeNode = TTRevDetail.dqs(".active", revDetail);
		if (activeNode) {
			activeNode.classList.remove("active");
		}
		target.parentNode.classList.add("active");
		const v = reviewsData;
		v.revDetailInfo.imageIndex = parseInt(index);
		this.switchResourceShow(
			resources[index],
			TTRevDetail.dqs(".media-swiper", revDetail)
		);
	},

	dqs(selector, context) {
		let node;
		if (context) {
			node = context.querySelector(selector);
		} else {
			node = document.querySelector(selector);
		}
		return node;
	},

	dqsa(selector, context) {
		let nodes;
		if (context) {
			nodes = context.querySelectorAll(selector);
		} else {
			nodes = document.querySelectorAll(selector);
		}
		return nodes;
	},

	getTTDetailReviewInfo(data) {
		let { reviewsData } = TTRevDetail;
		const v = reviewsData;
		const userSetting = v.userSetting;

		let resources = "";
		if (data.resources.length > 0) {
			data.resources.forEach((it, index) => {
				const videoTipHtml =
					it.resource_type === 2
						? `<div class="tt-video-player" style="position:absolute">
      <img style="width:24px;height:24px" src="https://cdn.vstar.app/static/images/player.png" />
    </div>`
						: "";
				const imgSrc = it.resource_type === 2 ? it.thumb_src : it.src;
				let proportion = (it.width / it.height).toFixed(2);
				resources += `<div class="resource-item" proportion="${proportion}"><img index="${index}"  alt="${index}"  src="${imgSrc}">
				${videoTipHtml}
			</div>`;
			});
			resources = `<div class="resource-list">${resources}</div>`;
		}

		// 名字的显示
		let authorCountry = "";
		const flagCls = data.author_country
			? "country-flag " + data.author_country
			: "";
		const flag = `<span class="${flagCls}"
   style="${data.author_country ? "border: 1px solid #ccc;" : ""}" ></span>`;
		const country = ` <span class="country-name">${data.author_country}</span>`;
		const flagType = userSetting.is_show_country_flag;
		if (flagType == 1) {
			authorCountry = flag + country;
		} else if (flagType == 3) {
			authorCountry = flag;
		} else if (flagType == 4) {
			authorCountry = country;
		}

		// 时间的显示
		let reviewDate = "";
		let d = [];
		if (data.commented_at.indexOf("/") !== -1) {
			d = data.commented_at.split("/");
		} else if (data.commented_at.indexOf("-") !== -1) {
			d = data.commented_at.split("-");
		}
		if (userSetting.review_date_format_type === 1) {
			reviewDate = d[1] + "/" + d[2] + "/" + d[0];
		} else if (userSetting.review_date_format_type === 2) {
			reviewDate = d[2] + "/" + d[1] + "/" + d[0];
		} else if (userSetting.review_date_format_type === 3) {
			reviewDate = data.commented_at;
		}
		let dateHtml = reviewDate
			? `<span class="reviews-date">${reviewDate}</span>`
			: "";

		// 徽章的显示
		const veryIcon = v.badgeIconSvg;
		const veryText = `<span class="verified-text">${v.lang.verified_purchase}</span>`;
		const veryType = userSetting.is_show_verified_badge;
		let onlyVeryIcon = "",
			userVerified = "";

		if (data.verified_badge === 1) {
			if (veryType === 1) {
				userVerified = `<div class="user-verified">
				${veryIcon + veryText}</div>
			`;
			} else if (veryType === 2) {
			} else if (veryType === 3) {
				onlyVeryIcon = veryIcon;
			}
		}

		let itemType = "";
		if (v.userSetting.item_type === 1 && data.item_type) {
			itemType = `<div style="margin-top: 12px">
			<p style="font-size: 12px; opacity: 0.6">
				${v.lang.item_type}
			</p>
			<p style="font-size: 14px;">${data.item_type}</p>
		</div>`;
		}

		// 反馈的显示
		let merchantReply = "";
		if (data.reply_content !== "") {
			const content = v.lang.shop_name.replace(
				"{{shop_name}}",
				v.userSetting.store_name
			);
			merchantReply = `<div class="merchant-reply">
			<div class="reply-title">
			 ${content}:</div>
				<div class="reply-content">${data.reply_content}</div>
			</div>`;
		}

		return `
	<div class="review-row-one">
		<div class="star vstar-star">${TTRevDetail.getTTDetailStar(data.star)}  </div>
		${dateHtml}
	</div>
		<div class="user-message">  
			<span class="user-name"> <span class="author-name"> ${
				data.author
			}  </span> </span>
			${authorCountry}
			${onlyVeryIcon}
			${userVerified}     
		</div>
		${resources}
		<p class="reviews-text">${data.content}</p>
		${itemType}
		${merchantReply}
	`;
	},

	// type-1 字体文件星星图标 type-2 幻灯片星星图标（黑白） type-3 产品页、集合页评价星星图标
	getTTDetailStar(rating) {
		const { reviewsData: v } = TTRevDetail;
		// size参数有值，说明是要用svg星星图标
		const star = v.ratingIconSvg;
		const starString = `<div class="star-item">${star}</div>`;
		const nostarString = `<div class="star-item nostar">${star}</div>`;

		if (!parseInt(rating)) rating = 0;
		var starTag = "";
		var starNum = Math.floor(rating);

		for (var i = 0; i < starNum; i++) {
			starTag += starString;
		}

		for (var i = 0; i < 5 - starNum; i++) {
			starTag += nostarString;
		}

		return starTag;
	},
	shopNow: {
		ar: "تسوق الآن",
		bg: "Пазарувай сега",
		cs: "Nakupovat nyní",
		da: "Shop nu",
		de: "Jetzt einkaufen",
		el: "Ψώνισε τώρα",
		es: "Compra ahora",
		et: "Osta kohe",
		fi: "Osta nyt",
		fr: "Achetez maintenant",
		he: "קנה עכשיו",
		hr: "Kupi sada",
		hu: "Vásárolj most",
		id: "Belanja sekarang",
		it: "Acquista ora",
		ja: "今すぐ購入",
		ka: "შეძინე ახლა",
		ko: "지금 쇼핑하기",
		lt: "Pirkti dabar",
		lv: "Iepērcies tagad",
		ms: "Beli sekarang",
		nl: "Nu winkelen",
		no: "Handle nå",
		pl: "Kup teraz",
		pt: "Compre agora",
		"pt-BR": "Compre agora",
		"pt-PT": "Compre agora",
		ro: "Cumpără acum",
		sk: "Nakupujte teraz",
		sl: "Kupite zdaj",
		sv: "Handla nu",
		th: "ช้อปทันที",
		tr: "Şimdi alışveriş yap",
		uk: "Купити зараз",
		vi: "Mua ngay",
		"zh-CN": "立即购买",
		"zh-TW": "立即購買",
	},
};
