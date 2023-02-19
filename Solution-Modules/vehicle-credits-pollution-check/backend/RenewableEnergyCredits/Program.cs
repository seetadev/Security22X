using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using RenewableEnergyCredits.Config;
using YamlDotNet.RepresentationModel;

namespace RenewableEnergyCredits
{
    public class Program
    {
        public static MantleConfig MantleConfig { get; private set; }

        public static void Main(string[] args)
        {
            using (var reader = new StreamReader("Config/mantle-config.yaml")) {
                var yaml = new YamlStream();
                yaml.Load(reader);

                var mapping = (YamlMappingNode) yaml.Documents[0].RootNode;
                var yamlDict = mapping.Children;

                MantleConfig = new MantleConfig()
                {
                    ProductId = yamlDict["productId"].ToString(),
                    ApiKey =  yamlDict["apiKey"].ToString(),
                    ApiUrl = yamlDict["apiUrl"].ToString()
                };

                BuildWebHost(args).Run();
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
