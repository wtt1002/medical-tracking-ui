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
    riskOptions:[
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
    preDrugOptions:[
        "氯吡格雷",
        "替格瑞洛"
    ]
}
export { patientData }