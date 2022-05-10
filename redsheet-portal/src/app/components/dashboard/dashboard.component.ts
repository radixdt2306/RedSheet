import { Component, OnInit, Inject, Query } from "@angular/core";
import { ApplicationBroadcaster } from "@rx/core";
import { HIDE_SIDE_BAR } from "app/const";
import { ProjectsService } from "app/components/project/projects/projects.service";
import { Router } from "@angular/router";
import { Project, vUserLookup, } from "app/database-models";
import { RxDialog, DialogClick } from "@rx/view";
import { ProjectModuleStatic } from "app/domain/project-module.static";
import { DashboardService } from "app/components/dashboard/dashboard.service";
import { ProjectLookupGroup } from '../project/projects/domain/project.models';
import { ProjectNegotionalityLookups } from "app/lookups";
import { AuditLogService } from "app/components/audit-logs/audit-log.service";
import { LogSearchModel } from "app/models";
import { API_HOST_URI } from "@rx";
import { PdfService } from "app/components/pdf/pdf.service";
import { RxSpinner } from "@rx/view";
import { EmailTransactionService } from "../email-transaction/email-transaction.service";
import { EmailTransaction } from "app/database-models/email-transaction";

// declare var d3pie: any;
declare var d3: any;
declare var initOnboarding: any;
@Component({
    templateUrl: './dashboard.component.html',
})


export class DashboardComponent implements OnInit {
    isBindActivity: boolean = false;
    data: any
    statistics: any;
    projects: any;
    projectLookupGroup: ProjectLookupGroup;
    users: vUserLookup[];
    logSearchModel: LogSearchModel;
    isStatus: boolean;
    recentActivities: any;
    recentActivityCnt: number;
    selectedMenue: boolean = false;
    flagmenu = false;
    emailTransactions:EmailTransaction[]=[];

    expandMyprogress:boolean=false; // for myprogress collapse

    // notifications:any;
    constructor(@Inject(RxSpinner) private spinner: RxSpinner,
        applicationBroadcaster: ApplicationBroadcaster,
        private projectService: ProjectsService,
        private dashboardService: DashboardService,
        private emailTransactionService: EmailTransactionService,
        private pdfService: PdfService,
        private auditLogService: AuditLogService,
        private dialog: RxDialog,
        private router: Router,
        @Inject(API_HOST_URI) private hostUri: string,
    ) {
        this.data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        applicationBroadcaster.allTypeBroadCast(HIDE_SIDE_BAR);
    }

    ngOnInit(): void {
        
        ProjectModuleStatic.CurrentProjectModuleId = undefined;
        this.statistics = [{ totalNegotiation: 0 }, { completed: 0 }, { inProgress: 0 }, { notStarted: 0 }];
        this.dashboardService.search({ Query: [] }).subscribe(s => {
            if (s.result) {
                this.statistics = s.result[0].ChartInfo[0];
               /*
                 to set recentActivities 
                // if (s.result[0].RecentActivities == undefined) {
                //     this.recentActivities = s.result[0].RecentActivities;
                //     this.recentActivityCnt = 0;
                // }
                // else {
                //     this.recentActivities = s.result[0].RecentActivities;
                //     this.recentActivityCnt = s.result[0].RecentActivities.length;
                // }
                */
                this.isBindActivity = true;
            }
            var contents = [];
            //contents.push({label: "TotalNegotiation",value: this.statistics.totalNegotiation})
            contents.push({ value: this.statistics.completed, color: "#ef3340" })
            contents.push({ value: this.statistics.inProgress, color: "#425563" })
            contents.push({ value: this.statistics.notStarted, color: "#b0b6bd" })
            if (this.statistics["totalNegotiation"] > 0) {
                var chartElement = document.getElementById("piechart");
                chartElement.removeAttribute("d3pie");
                chartElement.innerHTML = '';
                var chartExist = document.getElementById("piechart").hasAttribute("d3pie");

                if (!chartExist) {
                    var width = 350;
                    var height = 300;
                    var radius = 120;

                    var svg = d3.select("#piechart").append("svg")
                        .attr("viewBox", "0 0 350 300")
                        // .attr("width", width)
                        // .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    var arc = d3.svg.arc()
                        .outerRadius(radius)
                        .innerRadius(50);

                    var pie = d3.layout.pie()
                        .sort(null)
                        .value(function (d) { return d.value; });

                    var g = svg.selectAll(".fan")
                        .data(pie(contents))
                        .enter()
                        .append("g")
                        .attr("class", "fan")

                    g.append("path")
                        .attr("d", arc)
                        .attr("fill", function (d) { return d.data.color; })

                    g.append("text")
                        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                        .style("text-anchor", "middle")
                        .text(function (d) { return d.data.legend; });

                    var steps = [{
                        "intro": "<h3>Welcome to the Academy for Procurement Excellence</h3><p>Welcome to the Academy for Procurement Excellence (APEX). The site to provide guidance, learning toolkits and collaborative processes to support all NHS commercial functions and aligning with our social values commitment.</p>",
                        "tooltipClass": "introjs-tooltip--large"
                    }, {
                        "element": ".svg-content",
                        "intro": "<p>The APEX Academy is designed to help you buy more effectively.  Each segment covers a different aspect of the buying process.  Hover over each link to find out more.</p>",
                        "position": "right",
                        "tooltipClass": "introjs-tooltip--large",
                        "onchange": {
                            "body": ""
                        }
                    }, {
                        "element": "#modal",
                        "intro": "<p>Read each quick start description and then dive into the content.  Once you have read each overview you can choose to dismiss the guidance and use the tool.</p>",
                        "position": "right",
                        "tooltipClass": "introjs-tooltip--large",
                        "onbeforechange": {
                            "body": ""
                        }
                    }, {
                        "element": "#introVideo",
                        "intro": "<p>We recommend that you take a few moments to watch the introductory video on how APEX will add value to what we do.</p>",
                        "position": "right",
                        "tooltipClass": "introjs-tooltip--large",
                        "onbeforechange": {
                            "body": ""
                        }
                    }, {
                        "intro": "<p>If you don't want to see this walkthrough again click <a href=\"#dismissWalkthrough\" onclick=\"dismissIntroJs('ApexLite_onboardingDismissed')\">here</a>. otherwise please click the 'Finish' button.</p>",
                        "position": "right",
                        "tooltipClass": "introjs-tooltip--large"
                    }]
                    //initOnboarding(steps);

                }
            }
        }, error => {

        });

        this.emailTransactionService.search({Query:[{ searchValue: "", dateOrder:"DESCENDING", emailCategory: ""}]}).subscribe(
            (emailtransaction)=>{
                console.log(emailtransaction.result);
                    this.emailTransactions = emailtransaction.result;
            },
            (error)=>{

            }
        )

        this.projectService.search({ isMyProject: true }).subscribe(t => {
            this.projectService.lookup([ProjectNegotionalityLookups.userLookups]).then((response: ProjectLookupGroup) => {
                this.users = response.userLookups;
            });
            var count = 0;
            if (t.projects) {
                t.projects.forEach(tt => {
                    tt.rowIndex = count;
                    count++;
                });
                this.projects = t.projects;

                for (var j: number = 0; j < this.projects.length; j++) {
                    this.projects[j]["hideDropDown"] = false;
                    this.projects[j]["userId"] = this.projects[j].ownerId;
                }
                if (this.projects.length > 1) {
                    this.projects[0]['isStageReached'] = true
                    this.projects[1]['isStageReached'] = true
                }
                else {
                    this.projects[0]['isStageReached'] = true
                }
            }
            else {
                this.projects = new Project();
            }
        });

        // this.logSearchModel.startDate = new Date();
        // this.logSearchModel.endDate = new Date();
        // this.auditLogService.search(this.logSearchModel).subscribe(t=>{

        // });
    }

    removeMenu() {
        
        if (this.flagmenu) {
            this.flagmenu = false;
        }
        else {
            this.selectedMenue = false;
        }
    }

    closeProject(project: Project): void {
        project.status = project['projectStatus'];
        this.dialog.confirmation([project.projectName], "close").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                project.isClosed = true;
                this.projectService.put(project).subscribe(t => {
                    this.ngOnInit();
                }, error => {

                });
            }
            else {
                project.isClosed = false;
            }
        });
    }

    activeProject(project: Project): void {
        project.status = project['projectStatus'];
        this.dialog.confirmation([project.projectName], "reactive").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                project.isClosed = false;
                project.status = false;
                this.projectService.put(project).subscribe(t => {
                    this.ngOnInit();
                }, error => {

                });
            }
            else {
                project.isClosed = true;
                project.status = true;
            }
        });
    }

    liveProject(project: Project): void {
        this.dialog.confirmation([project.projectName], "share").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                
                project.status = true;
                this.projectService.put(project).subscribe(t => {
                    project.isClosed = true;
                    this.ngOnInit();
                }, error => {

                });
            }
            else {
                project.isClosed = false;
            }
        });
    }

    showDropDown(dataItem: Project): void {
        if (this.users) {
            this.projectService.lookup([ProjectNegotionalityLookups.userLookups]).then((response: ProjectLookupGroup) => {
                this.users = response.userLookups;
            });
        }

        this.projects.forEach(element => {
            element["hideDropDown"] = false;
        });

        let index = this.projects.findIndex(t => t.projectId == dataItem.projectId);
        this.projects[index]["hideDropDown"] = true;
        this.selectedMenue = true;
        this.flagmenu = true;
    }

    changeOwnership(dataItem: Project, userId: number): void {
        

        this.dialog.confirmation([dataItem.projectName], "changeOwner").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                dataItem.ownerId = userId;
                //dataItem.status = dataItem.projectStatus;
                dataItem.status = false;
                // dataItem.isAllowCustomization = dataItem.isAllowCustomization;
                // project.isClosed = false;
                this.projectService.put(dataItem).subscribe(t => {
                    let index = this.projects.findIndex(t => t.projectId == dataItem.projectId);
                    this.projects[index]["hideDropDown"] = false;
                    this.ngOnInit();
                }, error => {
                });
            }
        });
    }

    getIconClass(TemplateModuleId): string {
        let iconClass: string;
        switch (TemplateModuleId) {
            case 38:
                iconClass = "redsheet redsheet-background  fa-4x";
                break;
            case 39:
                iconClass = "fa fa-users  fa-4x";
                break;
            case 40:
                iconClass = "redsheet redsheet-culture fa-4x";
                break;
            case 41:
                iconClass = "redsheet redsheet-negotionality  fa-4x";
                break;
            case 42:
                iconClass = "redsheet redsheet-this-negotiation fa-4x";
                break;
            case 43:
                iconClass = "redsheet redsheet-power fa-4x";
                break;
            case 44:
                iconClass = "redsheet redsheet-game fa-4x";
                break;
            case 45:
                iconClass = "redsheet redsheet-requirement fa-4x";
                break;
            case 46:
                iconClass = "redsheet redsheet-their-requirement fa-4x";
                break;
            // case 47:
            //     iconClass = "redsheet redsheet-requirement fa-4x";
            //     break;
            case 47:
                iconClass = "redsheet redsheet-culture-plan fa-4x";
                break;
            case 48:
                iconClass = "redsheet redsheet-preparation fa-4x";
                break;
            case 49:
                iconClass = "redsheet redsheet-event-timeline fa-4x";
                break;
            case 50:
                iconClass = "redsheet redsheet-post-event-action fa-4x";
                break;
            case 51:
                iconClass = "redsheet redsheet-outcomes-and-learning fa-4x";
                break;
            case 52:
                iconClass = "redsheet redsheet-background fa-4x";
                break;
            case 53:
                iconClass = "redsheet redsheet-meeting-management fa-4x";
                break;
            case 54:
                iconClass = "redsheet redsheet-this-negotiation fa-4x";
                break;
            case 55:
                iconClass = "redsheet redsheet-meeting-management fa-4x";
                break;
            default:
                iconClass = "";
        }
        return iconClass;

    }

    exportHtmlToPdf(project: Project): void {
        project.status = true;
        this.dialog.confirmation([project.projectName], "download").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.spinner.show();
                window.location.href = this.hostUri + 'api/ExportReportPDFs/exportHtmlToPdf?projectId=' + project.projectId;
                window.setTimeout(() => { this.spinner.hide(); }, 18000);
            }
        });
    }

    public downloadDocument(data: string, fileName: string) {
        var binaryString = window.atob(data['data']);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        var documentType = 'application/pdf';
        var link = document.createElement('a');
        var blob = new Blob([bytes], { type: documentType });
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
    }

    getSymbol(TemplateModuleId): string {
        let iconClass: string;
        if (TemplateModuleId == 41 || TemplateModuleId == 45 || TemplateModuleId == 46) {
            return iconClass = "sup color-blue-gray fa fa-registered";
        }
        else {
            return iconClass = "";
        }

    }

    navigateTo(navigateUrl): void {
        this.router.navigate([navigateUrl]);
    }

    deleteProject(project: Project): void {
        this.dialog.confirmation([project.projectName], "delete").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.projectService.delete(project.projectId).subscribe(t => {
                    
                    this.ngOnInit();
                }, error => {

                });
            }
        });
    }

    onCreateCopy(project) {
        this.dialog.confirmation([project.projectName], "copy").then(dialogClick => {
            if (dialogClick == DialogClick.PrimaryOk) {
                this.spinner.show();
                this.projectService.createCopy(project.projectId).subscribe(t => {
                    this.spinner.hide();
                    this.router.navigate(['/project/projects', t])
                }, error => {
                    this.spinner.hide();
                });
            }
        });
    }
}
