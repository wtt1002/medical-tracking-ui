var patientData = {
    daptItem: [
        {
            value: "0",
            reason: "0",
            score: 0,
            desc: "年龄≥75得-2分，65-74得-1分，＜65得0分"
        },
        {
            value: "1",
            reason: "目前吸烟",
            score: 1,
            desc: "目前吸烟得1分"
        },
        {
            value: "2",
            reason: "糖尿病",
            score: 1,
            desc: "糖尿病得1分"
        },
        {
            value: "3",
            reason: "此次心梗",
            score: 1,
            desc: "此次心梗得1分"
        },
        {
            value: "4",
            reason: "既往PCI或心梗",
            score: 1,
            desc: "既往PCI或心梗得1分"
        },
        {
            value: "5",
            reason: "紫杉醇支架",
            score: 1,
            desc: "紫杉醇支架得1分"
        },
        {
            value: "6",
            reason: "支架直径＜3mm",
            score: 1,
            desc: "支架直径<3mm得1分"
        },
        {
            value: "7",
            reason: "慢性心衰或EF＜30%",
            score: 2,
            desc: "慢性心衰或EF＜30%得2分"
        },
        {
            value: "8",
            reason: "移植静脉PCI",
            score: 2,
            desc: "移植静脉PCI得2分"
        }],
    pciTypeItem: [
        {
            value: "1",
            label: "左主干(LM)"
        }, {
            value: "2",
            label: "左前降支(LAD)"
        }, {
            value: "3",
            label: "左回旋支(LCX)"
        }, {
            value: "4",
            label: "右冠状动脉(RCA)"
        }],
    contrastMediumTypeItem: [
        {
            value: "1",
            label: "高渗"
        }, {
            value: "2",
            label: "等渗"
        }, {
            value: "3",
            label: "低渗"
        }],
    pciAntiplateletItem: [
        {
            value: "1",
            label: "阿司匹林"
        }, {
            value: "2",
            label: "替格瑞洛"
        }, {
            value: "3",
            label: "氯吡格雷"
        }],
    pciAnticoagulantItem: [
        {
            value: "1",
            label: "肝素"
        }, {
            value: "2",
            label: "比伐芦定"
        }],
    operateDrugItem: [
        {
            value: "1",
            label: "硝酸甘油"
        }, {
            value: "2",
            label: "尼可地尔"
        }, {
            value: "3",
            label: "Ⅱb/Ⅲa受体拮抗剂"
        }, {
            value: "4",
            label: "Angio guided"
        }, {
            value: "5",
            label: "IVUS guided"
        }, {
            value: "6",
            label: "FFR guided"
        }],
    assistiveDeviceItem: [
        {
            value: "1",
            label: "血栓抽吸装置"
        }, {
            value: "2",
            label: "临时起搏器"
        }, {
            value: "3",
            label: "IABP"
        }, {
            value: "4",
            label: "旋磨"
        }],
    interventionProblemItem: [
        {
            value: "1",
            label: "无"
        }, {
            value: "2",
            label: "无复流/慢血流"
        }, {
            value: "3",
            label: "冠脉穿孔"
        }, {
            value: "4",
            label: "冠脉撕裂"
        }, {
            value: "5",
            label: "血管内膜下出血"
        }, {
            value: "6",
            label: "急性闭塞"
        }, {
            value: "7",
            label: "心包填塞"
        }, {
            value: "8",
            label: "器械脱落或折断"
        }, {
            value: "9",
            label: "球囊不能收回"
        }, {
            value: "10",
            label: "血/气栓栓塞"
        }, {
            value: "11",
            label: "恶性心率失常"
        }, {
            value: "12",
            label: "死亡"
        }],
    contrastOutputItem: [
        {
            position: "开口",
            LM: "",
            LAD: "",
            LCX: "45",
            RCA: "",
            OTHER: ""
        }, {
            position: "近段",
            LM: "",
            LAD: "",
            LCX: "66",
            RCA: "",
            OTHER: ""
        }, {
            position: "中段",
            LM: "",
            LAD: "",
            LCX: "",
            RCA: "23",
            OTHER: ""
        }, {
            position: "远段",
            LM: "",
            LAD: "",
            LCX: "",
            RCA: "",
            OTHER: ""
        }
    ],
    pciDetailItem: [
        {
            position: "LM",
            catheter: "",
            wire: "",
            preBalloon: "",
            stent: "",
            aftBalloon: ""
        }, {
            position: "LAD",
            catheter: "",
            wire: "",
            preBalloon: "",
            stent: "",
            aftBalloon: ""
        }, {
            position: "LCX",
            catheter: "",
            wire: "",
            preBalloon: "",
            stent: "",
            aftBalloon: ""
        }, {
            position: "RCA",
            catheter: "",
            wire: "",
            preBalloon: "",
            stent: "",
            aftBalloon: ""
        }
    ],
    pciInfoItem: [
        {
            value: "1",
            label: "左桡动脉"
        },
        {
            value: "2",
            label: "右桡动脉"
        }, {
            value: "3",
            label: "左股动脉"
        }, {
            value: "4",
            label: "右股动脉"
        }, {
            value: "5",
            label: "尺动脉"
        }, {
            value: "6",
            label: "肱动脉"
        }],
    drugPlanItem: [
        {
            drugCategoryCode: "0001",
            drugCategoryName: "抗血小板类",
            drugAndUseageDtoList:
                [{
                    drug: {
                        drugName: "阿司匹林"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "袋",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                }, {
                    drug: {
                        drugName: "阿司匹林"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "粒",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                }, {
                    drug: {
                        drugName: "阿司匹林"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "粒",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                },]
        }, {
            drugCategoryCode: "0001",
            drugCategoryName: "他汀类",
            drugAndUseageDtoList:
                [{
                    drug: {
                        drugName: "阿司匹林33"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "粒",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                }, {
                    drug: {
                        drugName: "阿司匹林33"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "粒",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                }, {
                    drug: {
                        drugName: "阿司匹林33"
                    },
                    followDrugUsage: {
                        drugUsageId: "",
                        drugDosage: "1",
                        drugDosageUnit: "粒",
                        drugTime: "3",
                        drugDay: "1",
                        drugPeriod: "3",
                        drugPeriodUnit: "周",
                        drugId: "",
                        medicalHistoryId: "",
                        followUpIndex: "",
                    }
                },]
        }
    ],
    drugItem: [
        {
          value: "1000",
          label: "抗血小板类",
          children: [
            {
              value: "1001",
              label: "阿司匹林"
            },
            {
              value: "1002",
              label: "替格瑞洛"
            },
            {
              value: "1003",
              label: "氯吡格雷"
            },
            {
              value: "1004",
              label: "其它"
            }
          ]
        },
        {
          value: "2000",
          label: "他汀类",
          children: [
            {
              value: "2001",
              label: "瑞舒伐他汀"
            },
            {
              value: "2002",
              label: "阿托伐他汀"
            },
            {
              value: "2003",
              label: "辛伐他汀"
            },
            {
              value: "2004",
              label: "普伐他汀"
            },
            {
              value: "2005",
              label: "其它"
            }
          ]
        },
        {
          value: "3000",
          label: "β受体阻滞剂类",
          children: [
            {
              value: "3001",
              label: "琥珀酸美托洛尔缓释片"
            },
            {
              value: "3002",
              label: "酒石酸美托洛尔片"
            },
            {
              value: "3003",
              label: "富马酸比索洛尔片"
            },
            {
              value: "3004",
              label: "其它"
            }
          ]
        },
        {
          value: "4000",
          label: "ARB/ACEI",
          children: [
            {
              value: "4001",
              label: "其它"
            }
          ]
        },
        {
          value: "5000",
          label: "质子泵抑制剂",
          children: [
            {
              value: "5001",
              label: "其它"
            }
          ]
        },
        {
          value: "6000",
          label: "抗凝药",
          children: [
            {
              value: "6001",
              label: "华法林"
            },
            {
              value: "6002",
              label: "NOAC"
            },
            {
              value: "6003",
              label: "其它"
            }
          ]
        },
        {
          value: "7000",
          label: "利尿剂",
          children: [
            {
              value: "7001",
              label: "其它"
            }
          ]
        },
        {
          value: "8000",
          label: "其它",
          children: [
            {
              value: "8001",
              label: "其它"
            }
          ]
        }
      ],
    pciItem: [
        {
            examValueId: "",
            examItemCode: "5001",
            examItemName: "心肌肌钙蛋白",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "cTnT/I",
            examItemUnit: "×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "5002",
            examItemName: "肌酸激酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CK",
            examItemUnit: "×10^12/L"
        },
        {
            examValueId: "",
            examItemCode: "5003",
            examItemName: "肌酸激酶同工酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CK-MB",
            examItemUnit: "×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "5004",
            examItemName: "肌酐",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "Cr",
            examItemUnit: "μmol/L"
        }
    ],
    bloodOptions: [
        "出血",
        "血肿",
        "假性动肿瘤",
        "动静脉瘘",
    ],
    diagnoseOptions: [
        {
            value: "稳定性冠心病",
            label: "稳定性冠心病",
        },
        {
            value: "急性冠脉综合征",
            label: "急性冠脉综合征",
            children: [
                {
                    value: "不稳定性心绞痛",
                    label: "不稳定性心绞痛",
                    children: [
                        {
                            value: "I级",
                            label: "I级"
                        },
                        {
                            value: "II级",
                            label: "II级"
                        },
                        {
                            value: "III级",
                            label: "III级"
                        },
                        {
                            value: "IV级",
                            label: "IV级"
                        },
                        {
                            value: "未做评估",
                            label: "未做评估"
                        }
                    ]
                },
                {
                    value: "非ST段抬高型心肌梗死",
                    label: "非ST段抬高型心肌梗死",
                    children: [
                        {
                            value: "I级",
                            label: "I级"
                        },
                        {
                            value: "II级",
                            label: "II级"
                        },
                        {
                            value: "III级",
                            label: "III级"
                        },
                        {
                            value: "IV级",
                            label: "IV级"
                        },
                        {
                            value: "未做评估",
                            label: "未做评估"
                        }
                    ]
                },
                {
                    value: "ST段抬高心肌梗死",
                    label: "ST段抬高心肌梗死",
                    children: [
                        {
                            value: "I级",
                            label: "I级"
                        },
                        {
                            value: "II级",
                            label: "II级"
                        },
                        {
                            value: "III级",
                            label: "III级"
                        },
                        {
                            value: "IV级",
                            label: "IV级"
                        },
                        {
                            value: "未做评估",
                            label: "未做评估"
                        }
                    ]
                },
            ]
        }
    ],
    riskOptions: [
        "吸烟",
        "高血压",
        "血脂异常",
        "糖尿病",
        "肾功能不全",
        "早发冠心病家族史",
        "合并房颤",
        "慢性肺病",
        "慢性肾病",
        "脑血管疾病",
        "外周动脉疾病",
        "心肌梗死"
    ],
    preDrugOptions: [
        "氯吡格雷",
        "替格瑞洛"
    ],
    bloodItem: [
        {
            examValueId: "",
            examItemCode: "1001",
            examItemName: "白细胞",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "WBC",
            examItemUnit: " ×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "1002",
            examItemName: "红细胞",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "RBC",
            examItemUnit: "×10^12/L"
        },
        {
            examValueId: "",
            examItemCode: "1003",
            examItemName: "血小板",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "PLT",
            examItemUnit: " ×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "1004",
            examItemName: "血红蛋白",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "HGB",
            examItemUnit: " g/L"
        }
    ],
    liverKidneyItem: [
        {
            examValueId: "",
            examItemCode: "2001",
            examItemName: "谷丙转氨酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "ALT",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "2002",
            examItemName: "谷草转氨酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "AST",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "2003",
            examItemName: "葡萄糖",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "Glu",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "2004",
            examItemName: "尿酸",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "UA",
            examItemUnit: "μmol/L/L"
        },
        {
            examValueId: "",
            examItemCode: "2005",
            examItemName: "肌酐",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "Cr",
            examItemUnit: "μmol/L"
        }],
    bloodLipidItem: [
        {
            examValueId: "",
            examItemCode: "3001",
            examItemName: "总胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "TC",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "3002",
            examItemName: "甘油三酯",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "TG",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "3003",
            examItemName: "低密度脂蛋白胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "LDL-C",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "3004",
            examItemName: "高密度脂蛋白胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "HDL-C",
            examItemUnit: "mmol/L"
        }
    ],
    coagulationItem: [
        {
            examValueId: "",
            examItemCode: "4001",
            examItemName: "国际标准化比值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "INR",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "4002",
            examItemName: "D-二聚体定量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "D-Dimer",
            examItemUnit: "μg/L"
        },
        {
            examValueId: "",
            examItemCode: "4003",
            examItemName: "心肌肌钙蛋白",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "cTnT/I",
            examItemUnit: "ng/mL"
        },
        {
            examValueId: "",
            examItemCode: "4004",
            examItemName: "N末端B型利钠肽前体",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "NT-ProBNP",
            examItemUnit: "pg/mL"
        },
        {
            examValueId: "",
            examItemCode: "4005",
            examItemName: "肌酸激酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CK",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "4006",
            examItemName: "肌酸激酶同工酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CK-MB",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "4007",
            examItemName: "左心室射血分数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "LVEF",
            examItemUnit: "%"
        }],
    noninvasiveItem: [
        {
            examValueId: "",
            examItemCode: "6001",
            examItemName: "心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "HR",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "6002",
            examItemName: "每搏输出量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "SV",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6003",
            examItemName: "每搏指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "SVI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6004",
            examItemName: "心输出量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CO",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6005",
            examItemName: "心指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6006",
            examItemName: "心收缩指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "CTI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6007",
            examItemName: "左心做功指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "LCWi",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6008",
            examItemName: "左心收缩时间",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "LVET",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "6009",
            examItemName: "射血分数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "EF",
            examItemUnit: ""
        }],
    cardiopulmonaryItem: [
        {
            examValueId: "",
            examItemCode: "7001",
            examItemName: "峰值负荷",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "W"
        },
        {
            examValueId: "",
            examItemCode: "7002",
            examItemName: "峰值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "METs"
        },
        {
            examValueId: "",
            examItemCode: "7003",
            examItemName: "峰值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "VO2/Kg"
        },
        {
            examValueId: "",
            examItemCode: "7004",
            examItemName: "最大摄氧量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "VO2max",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "7005",
            examItemName: "无氧阀",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "AT",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "7006",
            examItemName: "静息心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "7007",
            examItemName: "峰值心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "7008",
            examItemName: "靶心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "7009",
            examItemName: "1秒用力呼气量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "FEV1",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "7010",
            examItemName: "FEV1占预计值百分比",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "%",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "7011",
            examItemName: "用力呼气量占用力肺活量比值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "FEV1/FVC%",
            examItemUnit: ""
        }],
    walkItem: [
        {
            examValueId: "",
            examItemCode: "8001",
            examItemName: "步行",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "walk",
            examItemUnit: "m"
        },
        {
            examValueId: "",
            examItemCode: "8002",
            examItemName: "心功能",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "8003",
            examItemName: "Borg量表",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 0,
            itemShortName: "",
            examItemUnit: "分"
        }
    ]
}
export { patientData }