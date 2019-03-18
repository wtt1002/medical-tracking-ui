var patientData = {
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
    contrastOutPutItem: [
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
        },{
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
        [
            {
                category: "心肌肌钙蛋白",
                drugName: "阿司匹林",
                singleDose: "100",
                timeOfDay: "1"
            },
            {
                drugName: "替格瑞洛",
                singleDose: "90",
                timeOfDay: "2"
            },
            {
                category: "添加",
            }

        ],
        [
            {
                category: "他汀类",
                drugName: "阿司匹林",
                singleDose: "100",
                timeOfDay: "1"
            },
            {
                drugName: "替格瑞洛",
                singleDose: "90",
                timeOfDay: "2"
            }

        ],
    ],
    pciItem: [
        {
            drugCh: "心肌肌钙蛋白",
            drugEn: "cTnT/I",
            examValue: "",
            pciItemUnit: "×10^9/L"
        },
        {
            drugCh: "肌酸激酶",
            drugEn: "CK",
            examValue: "",
            pciItemUnit: "×10^12/L"
        },
        {
            drugCh: "肌酸激酶同工酶",
            drugEn: "CK-MB",
            examValue: "",
            pciItemUnit: " ×10^9/L"
        },
        {
            drugCh: "肌酐",
            drugEn: "Cr",
            examValue: "",
            pciItemUnit: "μmol/L"
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
            examItemCode: "",
            examItemName: "白细胞",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "WBC",
            examItemUnit: " ×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "红细胞",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "RBC",
            examItemUnit: "×10^12/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "血小板",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "PLT",
            examItemUnit: " ×10^9/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "血红蛋白",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "HGB",
            examItemUnit: " g/L"
        }
    ],
    liverKidneyItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "谷丙转氨酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "ALT",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "谷草转氨酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "AST",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "葡萄糖",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "Glu",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "尿酸",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "UA",
            examItemUnit: "μmol/L/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "肌酐",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "Cr",
            examItemUnit: "μmol/L"
        }],
    bloodLipidItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "总胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "TC",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "甘油三酯",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "TG",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "低密度脂蛋白胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "LDL-C",
            examItemUnit: "mmol/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "高密度脂蛋白胆固醇",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "HDL-C",
            examItemUnit: "mmol/L"
        }
    ],
    coagulationItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "国际标准化比值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "INR",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "D-二聚体定量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "D-Dimer",
            examItemUnit: "μg/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心肌肌钙蛋白",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "cTnT/I",
            examItemUnit: "ng/mL"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "N末端B型利钠肽前体",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "NT-ProBNP",
            examItemUnit: "pg/mL"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "肌酸激酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "CK",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "肌酸激酶同工酶",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "CK-MB",
            examItemUnit: "U/L"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "左心室射血分数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "LVEF",
            examItemUnit: "%"
        }],
    noninvasiveItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "HR",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "每搏输出量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "SV",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "每搏指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "SVI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心输出量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "CO",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "CI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心收缩指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "CTI",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "左心做功指数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "LCWi",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "左心收缩时间",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "LVET",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "射血分数",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "EF",
            examItemUnit: ""
        }],
    cardiopulmonaryItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "峰值负荷",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "W"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "峰值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "METs"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "峰值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "VO2/Kg"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "最大摄氧量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "VO2max",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "无氧阀",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "AT",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "静息心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "峰值心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "靶心率",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "bpm"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "1秒用力呼气量",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "FEV1",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "FEV1占预计值百分比",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "%",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "用力呼气量占用力肺活量比值",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "FEV1/FVC%",
            examItemUnit: ""
        }],
    walkItem: [
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "步行",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "walk",
            examItemUnit: "m"
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "心功能",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: ""
        },
        {
            examValueId: "",
            examItemCode: "",
            examItemName: "Borg量表",
            medicalHistoryId: "",
            examValue: "",
            examIndex: 1,
            itemShortName: "",
            examItemUnit: "分"
        }
    ]
}
export { patientData }