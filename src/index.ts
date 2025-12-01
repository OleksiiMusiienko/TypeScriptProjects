import chalk from "chalk";
import { promises } from "dns";
import * as readline from 'readline';
//организация ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};
let inputData = "";
const input = async () => {
    inputData = await askQuestion("");
};

type Task = { id: number, title: string, description: string, completed: boolean };
let tasks: Task[] = [];
let identCount: number = 0;

function addTask(title: string, desc: string): void {
    const task: Task = {
        id: identCount++,
        title: title,
        description: desc,
        completed: false
    }
    tasks.push(task);
}
async function inputTask() {
    console.log(chalk.redBright("Title: "));
     await input();
    const title = inputData;
    console.log(chalk.redBright("Description: "));
    await input();
    const desc = inputData;
    addTask(title, desc);
}

function removeTask(id: number): void {
    const ind = tasks.findIndex(i => i.id === id)
    if (ind >= 0) {
         tasks.splice(ind, 1);
         console.log("Task deleted.");
    }
}
async function deleteTask(){
    listTasks();
    console.log(chalk.redBright("Enter the task number to delet: "));
    await input();
    let choice = Number(inputData);
    if (isNaN(choice)) {
        removeTask(choice);
    }
}

function markTaskAsCompleted(id: number): void {
    const task = tasks.find(i => i.id === id);
    if (task) {
        task.completed = true;
         console.log(`Task ${id} marked as completed.`);
    }else{
        console.log(`Task ${id} not found.`);
    }
}
async function changeTaskAsComleted() {
    listTasks();
    console.log(chalk.redBright("Enter the task number to mark: "));
    await input();
    let choice = +inputData;
    if (!isNaN(choice)) {
        console.log("cucu");
        markTaskAsCompleted(choice);
    }
}
function listTasks(): void {
    console.table(tasks);
}

function listCompletedTasks(): void {
     const completedTasks = tasks.filter(e => e.completed === true);
     console.table(completedTasks);
}

function listPendingTasks(): void {
    const pendingTasks = tasks.filter(e => e.completed === false);
    console.table(pendingTasks);  
}

function showMenu(): number {
    console.log(chalk.blue("MENU"));
    console.log("1. Add task");
    console.log("2. Delete task");
    console.log("3. Mark task as completed");
    console.log("4. Print completed task");
    console.log("5. Print pending task");
    console.log("6. Exit");
    console.log(chalk.redBright("Select and input number:"));
    return 0;
}
async function main(){
let cycle: boolean = true;
while (cycle) {
    showMenu();
    await input();
    switch (inputData) {
        case "1":
            await inputTask();
            break;
        case "2":
            await deleteTask();
            break;
        case "3":
            await changeTaskAsComleted();
            break;
        case "4":
            listCompletedTasks();
            break;
        case "5":
            listPendingTasks();
            break;
        case "6":
            cycle = false;
            break;
        default:
            console.log("Неверный ввод.");
            break;
    }

}
rl.close();
console.log("Завершение программы...");
process.exit(0);
}
main();

