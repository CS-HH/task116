let readlineSync = require('cli-interact');
var addStudent = ()=>{
    let stuInfo = readlineSync.question("请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：");
    let buf = stuInfo.split(',');
    while (!isCorrect(buf)) {
        stuInfo = readlineSync.question("请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：");
        buf = stuInfo.split(',');
    }
    let projectName = [];
    let projectScore =[];
    let sum = 0;
    for (let i = 4; i < buf.length; i++) {
        let pn = buf[i].split(':')[0];
        let ps = buf[i].split(':')[1];
        sum += parseInt(ps);
        projectName.push(pn);
        projectScore.push(ps);
    }
    let stu = {
        name: buf[0],
        num: buf[1],
        mz: buf[2],
        klass: buf[3],
        projectName: projectName,
        projectScore: projectScore,
        avg:sum/(buf.length - 4),
        sum:sum
    };
    studentArray.push(stu);
    console.log('学生' + stu.name + '的成绩被添加');
}

var showGraduate = ()=>{
    let stuId = readlineSync.question("格式： 学号, 学号,...");
            let buf = stuId.split(',');
            while (buf.length == 0) {
                stuId = readlineSync.question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
                buf = stuId.split(',');
            }
            let sheet = "成绩单\n姓名|";
            for (let i = 0; i < studentArray[0].projectName.length; i++) {
                sheet += studentArray[0].projectName[i];
                sheet += '|';
            }
            sheet += '平均分|总分 \n';
            sheet += "========================\n";
            for (let i = 0; i < buf.length; i++) {
                for (let j = 0; j < studentArray.length; j++) {
                    if (buf[i] == studentArray[j].num) {
                        sheet += studentArray[j].name + '|';
                        for (let x = 0; x < studentArray[j].projectScore.length; x++) {
                            sheet += studentArray[j].projectScore[x]+'|';
                        }
                        sheet += studentArray[j].avg + "|";
                        sheet +=  studentArray[j].sum + "\n";
                    }
                }
            }
            sheet += "========================\n";
            let sum =0;
            let zws = [];
            for(let i =0;i<studentArray.length;i++){
                sum += studentArray[i].sum;
                zws.push(studentArray[i].sum);
            }
            zws.sort();
            sheet += '全班总分平均数：'+(sum / (studentArray.length)) + '\n';
            sheet += '全班总分中位数：'+(zws[parseInt(studentArray.length/2)]);
            console.log(sheet);
}
function isCorrect(buf){
    if (buf.length < 5) {
        return false;
    }
    for (let i = 0; i < buf.length; i++) {
        if (buf[i] == null) {
            return false;
        }
    }
    return true;
}
module.exports = () => {}
    var studentArray = [];
    while(true){
        let choose = readlineSync.question("1. 添加学生\n2. 生成成绩单\n3. 退出\n请输入你的选择（1～3）：");
        if (choose === '1') {
            addStudent();
        }else if(choose==='2'){
            showGraduate();
        }else if(choose==='3'){
            break;
        }else{
            choose = readlineSync.question("请正确输入1. 添加学生\n2. 生成成绩单\n3. 退出\n请输入你的选择（1～3）：");
        }
    }
