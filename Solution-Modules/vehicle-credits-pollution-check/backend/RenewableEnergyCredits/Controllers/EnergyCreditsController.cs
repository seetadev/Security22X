using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using RenewableEnergyCredits.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.KeyVault;
using Newtonsoft.Json;
using RenewableEnergyCredits.Config;
using RestSharp;

namespace RenewableEnergyCredits.Controllers
{
    [EnableCors("SiteCorsPolicy")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class EnergyCreditsController : Controller
    {
        private readonly RestClient _mantleRestClient;
        private readonly MantleConfig _mantleConfig;

        public EnergyCreditsController(RestClient mantleRestClient, MantleConfig mantleConfig)
        {
            _mantleRestClient = mantleRestClient;
            _mantleConfig = mantleConfig;
        }

        /// <summary>
        /// Get all of the energy energies that have been created.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var request = new RestRequest($"tracker/{_mantleConfig.ProductId}/assets", Method.GET);
            var response = await _mantleRestClient.ExecuteGetTaskAsync(request);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return StatusCode((int) response.StatusCode, response.Content);
            }

            var greenEnergies = JsonConvert.DeserializeObject<IEnumerable<GreenEnergy>>(response.Content);

            return Ok(greenEnergies);
        }
        
        
        /// <summary>
        /// Creates a new green energy in Tracker. You will be able to issue and transfer credits for this green energy.
        /// </summary>
        /// <returns></returns>
        [HttpPost("{greenEnergyName}")]
        public async Task<IActionResult> Create([FromRoute] string greenEnergyName)
        {
            var request = new RestRequest($"tracker/{_mantleConfig.ProductId}/assets", Method.POST);
            request.AddJsonBody(new
            {
                name = greenEnergyName
            });

            var response = await _mantleRestClient.ExecutePostTaskAsync(request);

            if (response.StatusCode != HttpStatusCode.Created)
            {
                return StatusCode((int) response.StatusCode, response.Content);
            }

            var createdGreenEnergy = JsonConvert.DeserializeObject<GreenEnergy>(response.Content);
            return StatusCode((int) response.StatusCode, createdGreenEnergy);

        }
        
        /// <summary>
        /// Get your balances from Tracker.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("balances")]
        public async Task<IActionResult> GetBalances()
        {
            var request = new RestRequest($"tracker/{_mantleConfig.ProductId}/balances", Method.GET);
            var response = await _mantleRestClient.ExecuteGetTaskAsync(request);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return StatusCode((int) response.StatusCode, response.Content);
            }

            var balances = JsonConvert.DeserializeObject<IEnumerable<Balance>>(response.Content);
            return Ok(balances);
        }

        /// <summary>
        /// Get a green energy by its id.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("{greenEnergyId}")]
        public async Task<IActionResult> GetGreenEnergyDetails([FromRoute] string greenEnergyId)
        {
            var request = new RestRequest($"tracker/{_mantleConfig.ProductId}/assets/{greenEnergyId}", Method.GET);
            var response = await _mantleRestClient.ExecuteGetTaskAsync(request);

            if (response.StatusCode != HttpStatusCode.OK)
            {
                return StatusCode((int) response.StatusCode, response.Content);
            }

            var greenEnergy = JsonConvert.DeserializeObject<GreenEnergy>(response.Content);
            return Ok(greenEnergy);
        }

        /// <summary>
        /// Issue green credits
        /// </summary>
        /// <returns></returns>
        [HttpPost("issue")]
        public async Task<IActionResult> Issue([FromBody] IssueRequest request)
        {
            var restRequest = new RestRequest($"tracker/{_mantleConfig.ProductId}/assets/{request.AssetId}/issue", Method.POST);
            restRequest.AddJsonBody(new MantleIssueRequest{
                RecipientEmail = request.RecipientEmail,
                Amount = request.Amount
            });

            var response = await _mantleRestClient.ExecutePostTaskAsync(restRequest);

            if (response.StatusCode != HttpStatusCode.NoContent)
            {
                return StatusCode((int) response.StatusCode, response.Content);
            }

            return StatusCode((int) response.StatusCode);
        }
 
        [HttpPost]
        [Route("transfer")]
        public async Task<IActionResult> TransferGreenCredits([FromBody] TransferRequest request)
        {
            //TODO: Implement energy credits transfer
            return Ok();
        }
    }
}
