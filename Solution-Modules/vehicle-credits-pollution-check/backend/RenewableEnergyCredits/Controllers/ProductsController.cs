using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using RenewableEnergyCredits.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace RenewableEnergyCredits.Controllers
{
    [EnableCors("SiteCorsPolicy")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly RestClient _mantleRestClient;

        public ProductsController(RestClient mantleRestClient)
        {
            _mantleRestClient = mantleRestClient;
        }

        /// <summary>
        /// Get a list of your products
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var request = new RestRequest("products", Method.GET);

            var response = await _mantleRestClient.ExecuteGetTaskAsync(request);
            
            var mantleProducts = JsonConvert.DeserializeObject<IEnumerable<MantleProduct>>(response.Content);

            return Ok(mantleProducts);
        }
    }
}
