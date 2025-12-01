"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const readline = __importStar(require("readline"));
//организация ввода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const askQuestion = (question) => {
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
let tasks = [];
let identCount = 0;
function addTask(title, desc) {
    const task = {
        id: identCount++,
        title: title,
        description: desc,
        completed: false
    };
}
async function inputTask() {
    console.log(chalk_1.default.redBright("Title: "));
    await input();
    const title = inputData;
    console.log(chalk_1.default.redBright("Description: "));
    await input();
    const desc = inputData;
    addTask(title, desc);
}
function removeTask(id) {
    const ind = tasks.findIndex(i => i.id === id);
    if (ind >= 0) {
        tasks.slice(ind, 1);
    }
}
async function deleteTask() {
    listTasks();
    console.log(chalk_1.default.redBright("Enter the task number to delet: "));
    await input();
    let choice = Number(inputData);
    if (isNaN(choice)) {
        removeTask(choice);
    }
}
function markTaskAsCompleted(id) {
    const task = tasks.find(i => i.id === id);
    if (task) {
        task.completed = true;
    }
}
async function changeTaskAsComleted() {
    listTasks();
    console.log(chalk_1.default.redBright("Enter the task number to mark: "));
    await input();
    let choice = Number(inputData);
    if (isNaN(choice)) {
        markTaskAsCompleted(choice);
    }
}
function listTasks() {
    console.table(tasks);
}
function listCompletedTasks() {
    console.table(tasks.filter(t => t.completed === true));
}
function listPendingTasks() {
    console.table(tasks.filter(t => t.completed === false));
}
function showMenu() {
    console.log(chalk_1.default.blue("MENU"));
    console.log("1. Add task");
    console.log("2. Delete task");
    console.log("3. Mark task as completed");
    console.log("4. Print completed task");
    console.log("5. Print pending task");
    console.log("6. Exit");
    console.log(chalk_1.default.redBright("Select and input number:"));
    return 0;
}
async function main() {
    let cycle = true;
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
