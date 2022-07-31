import React, { useEffect, useState } from 'react';
import './App.css';
import { createServer } from "miragejs"
import Table from "./components/generic-table/Table";
import Chart from "react-google-charts";
import { ICompany, ICompanyPerformance, ICountry } from "./entities/models/models";
import './data/mock-data/performance/countries/company_1.json';
import { company_8 } from "./data/mock-data/performance/countries/company_8";

import { dataReportsTableColumns } from "./data/table-data";
import { chart_data } from "./data/chart-data";
import { eCompanyId } from "./entities/models/enums";
import { company_1 } from "./data/mock-data/performance/countries/company_1";
import { company_2 } from "./data/mock-data/performance/countries/company_2";
import { company_3 } from "./data/mock-data/performance/countries/company_3";
import { company_4 } from "./data/mock-data/performance/countries/company_4";
import { company_5 } from "./data/mock-data/performance/countries/company_5";
import { company_6 } from "./data/mock-data/performance/countries/company_6";
import { company_7 } from "./data/mock-data/performance/countries/company_7";
import { calculateROI } from "./utilities/kpi_calculations";

//mock-server
let server =   createServer({
    routes() {
        {
            this.get("/api/users", () => ({
                users: [],
            }));

            this.get("/api/companies", () => ({
                companies: [],
            }));

            this.get("/api/performance/countries", () => ({
                countries: [],
            }));

            this.get(`/api/performance/countries/company/:id`, () => ({

                company: [],
            }));

            // this.get(`/api/performance/countries/company/:id`, () => {
            //     let data;
            //     let rawFile = new XMLHttpRequest();
            //     rawFile.overrideMimeType("application/json");
            //     rawFile.open("GET", './data/mock-data/performance/countries/company_1.json', true);
            //     rawFile.onreadystatechange = function() {
            //         if (rawFile.readyState === 4 && rawFile.status == 200) {
            //             data = JSON.parse(rawFile.responseText);
            //         }
            //     }
            //     return {
            //         company: data,
            //     }
            // });
        }
    },

});

//endpoints
// @ts-ignore
server.get("/api/companies", { companies: [
        {
            "display_name": "GameSys",
            "id": 1,
            "name": "gamesys"
        },
        {
            "display_name": "Playtika",
            "id": 2,
            "name": "playtika"
        },
        {
            "display_name": "Disney",
            "id": 3,
            "name": "disney"
        },
        {
            "display_name": "Twitter",
            "id": 4,
            "name": "twitter"
        },
        {
            "display_name": "King",
            "id": 5,
            "name": "king"
        },
        {
            "display_name": "Kabam",
            "id": 6,
            "name": "kabam"
        },
        {
            "display_name": "Car Jump",
            "id": 7,
            "name": "carjump"
        },
        {
            "display_name": "Play Studios",
            "id": 8,
            "name": "playstudios"
        }
    ]})
// @ts-ignore
server.get("/api/performance/countries", { countries: [
        {
            "installs": 13452,
            "country": "United States",
            "cost": 25000,
            "iso": "US",
            "revenue": 20000
        },
        {
            "installs": 9488,
            "country": "United Kingdom",
            "cost": 16002,
            "iso": "UK",
            "revenue": 11978
        },
        {
            "installs": 11394,
            "country": "Japan",
            "cost": 12495,
            "iso": "JP",
            "revenue": 17564
        },
        {
            "installs": 700,
            "country": "Belgium",
            "cost": 1500,
            "iso": "BE",
            "revenue": 622
        },
        {
            "installs": 863,
            "country": "Brazil",
            "cost": 423,
            "iso": "BR",
            "revenue": 511
        },
        {
            "installs": 11033,
            "country": "China",
            "cost": 14392,
            "iso": "CN",
            "revenue": 1500
        },
        {
            "installs": 4520,
            "country": "Germany",
            "cost": 7520,
            "iso": "DE",
            "revenue": 8300
        },
        {
            "installs": 200,
            "country": "Hungary",
            "cost": 350,
            "iso": "HU",
            "revenue": 100
        },
        {
            "installs": 200,
            "country": "Finland",
            "cost": 390,
            "iso": "FI",
            "revenue": 500
        }
    ] })
// @ts-ignore
server.get(`/api/performance/countries/company/{company_id}`, { company: company_8 })

function getCompanyPerformanceById(id:eCompanyId) {
    return new Promise((resolve, reject) => {
        let selectedList;
        switch (id) {
            case eCompanyId.company_1:
                selectedList = company_1;
                break;
            case eCompanyId.company_2:
                selectedList = company_2;
                break;
            case eCompanyId.company_3:
                selectedList = company_3;
                break;
            case eCompanyId.company_4:
                selectedList = company_4;
                break;
            case eCompanyId.company_5:
                selectedList = company_5;
                break;
            case eCompanyId.company_6:
                selectedList = company_6;
                break;
            case eCompanyId.company_7:
                selectedList = company_7;
                break;
            case eCompanyId.company_8:
                selectedList = company_8;
                break;
            default:
                reject('list not found');
        }
        resolve(selectedList);
    });
}

function App() {

    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [companiesPerformance, setCompaniesPerformance] = useState<{id: number, performance: ICompanyPerformance[]}[]>([]);

    const buildTableData = () => {
        companiesPerformance.forEach((company:{id: number, performance: ICompanyPerformance[]}) => {
            const currentCompany = companies.find(companyInfo => companyInfo.id === company.id);
            let companyName = currentCompany?.display_name;

            company.performance.forEach((performanceObj:ICompanyPerformance) => {
                const roi = calculateROI(performanceObj.revenue, performanceObj.cost);

                const country = countries.find(country => country.country === performanceObj.country);
                const indusrtyRoi = (country) ? calculateROI(country?.revenue, country?.cost) : 0;

            });

        });

    };


        useEffect(() => {

            const fetchCompanies = async () => {
                let response = await fetch("/api/companies");
                let data = await response.json();
                setCompanies(data.companies);
                return data.companies;
            }

            const fetchCountries = async () => {
                let response = await fetch("/api/performance/countries");
                let data = await response.json();
                setCountries(data.countries);
                return data.countries;
            }

            const fetchCompanyPerformance = async (companyId:number) => {
                let response = await fetch(`/api/performance/countries/company/5`);
                let data = await response.json();
                return data.company;
            }

            fetchCountries();
            fetchCompanies()
                .then((companies) => {
                    companies.forEach(async (company:ICompany) => {
                        let companyPerformance:ICompanyPerformance[] = await getCompanyPerformanceById(company.id) as ICompanyPerformance[];
                        setCompaniesPerformance((prevState) => [...prevState,
                            {
                                id: company.id,
                                performance: companyPerformance
                            }
                        ]);
                    });
                })
                .catch(err => {
                throw new Error(err)
            });

        }, []);


  return (
    <div className="App">

        {/*replace data with real data*/}
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={chart_data}
        />
        <Table
            columns={dataReportsTableColumns}
            data={[]} />
    </div>
  );
}

export default App;
