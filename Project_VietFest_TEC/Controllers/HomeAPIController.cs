using Project_VietFest_TEC.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Project_VietFest_TEC.Controllers
{
    public class HomeAPIController : ApiController
    {
        dbVietFestEntities db = new dbVietFestEntities();
        [HttpGet]
        [Route("api/load_san_pham")]
        public async Task<IHttpActionResult> load_san_pham()
        {
            var danh_muc_san_pham = await db.tblDanhMucSanPhams
                .Take(4)
                .ToListAsync();
            var list_data = new List<dynamic>();

            foreach (var items in danh_muc_san_pham)
            {
                var san_pham = await db.tblSanPhams
                    .Where(x => x.id_dmsp == items.id_dmsp)
                    .Select(x => new
                    {
                        ma_san_pham = x.id_sp,
                        ten_san_pham = x.ten_sp,
                        gia = x.gia,
                        mo_ta = x.mo_ta,
                        img = x.image
                    })
                    .ToListAsync();

                list_data.Add(new
                {
                    danh_muc_san_pham = items.ten_dmsp,
                    san_pham = san_pham
                });
            }
            if (list_data.Any())
            {
                return Ok(new { data = list_data });
            }
            else
            {
                return BadRequest("Không có dữ liệu");
            }
        }

        [HttpGet]
        [Route("api/load_full_san_pham")]
        public async Task <IHttpActionResult> load_full_san_pham()
        {
            var san_pham = await db.tblSanPhams
                 .OrderByDescending(x => x.id_sp)
                .Select(x => new
                {
                    ma_san_pham = x.id_sp,
                    ten_san_pham = x.ten_sp,
                    gia = x.gia
                })
                .ToListAsync();
            if(san_pham != null)
            {
                return Ok(new { data = san_pham });
            }
            else
            {
                return BadRequest("Không tồn tại dữ liệu");
            }
            
        }
    }
}
