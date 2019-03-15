var patientData = {
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
    noninvasiveItem: [{
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
    cardiopulmonaryItem: [{
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
    }]
}
export { patientData }