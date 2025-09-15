import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ExpenseModalComponent } from './app/components/expense-modal/expense-modal.component';
import { IncomeModalComponent } from './app/components/income-modal/income-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ExpenseModalComponent, IncomeModalComponent],
  template: `
    <div class="app-container">
      <header class="header">
        <h1>Financial Tracker</h1>
        <p>Track your income and expenses with ease</p>
      </header>
      
      <div class="content">
        <div class="button-container">
          <button class="action-btn expense-btn" (click)="showExpenseModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Record New Expense
          </button>
          
          <button class="action-btn income-btn" (click)="showIncomeModal = true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Record New Income
          </button>
        </div>

        <div class="records-container" *ngIf="expenses.length > 0 || incomes.length > 0">
          <div class="records-section" *ngIf="expenses.length > 0">
            <h3>Recent Expenses</h3>
            <div class="record-list">
              <div class="record-item expense-item" *ngFor="let expense of expenses">
                <div class="record-info">
                  <h4>{{ expense.description }}</h4>
                  <span class="category">{{ expense.category }}</span>
                  <span class="date">{{ expense.date }}</span>
                </div>
                <div class="record-amount expense-amount">-${{ expense.amount }}</div>
              </div>
            </div>
          </div>

          <div class="records-section" *ngIf="incomes.length > 0">
            <h3>Recent Income</h3>
            <div class="record-list">
              <div class="record-item income-item" *ngFor="let income of incomes">
                <div class="record-info">
                  <h4>{{ income.description }}</h4>
                  <span class="category">{{ income.category }}</span>
                  <span class="date">{{ income.date }}</span>
                </div>
                <div class="record-amount income-amount">+${{ income.amount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-expense-modal
      [isOpen]="showExpenseModal"
      (close)="showExpenseModal = false"
      (save)="onExpenseSave($event)">
    </app-expense-modal>

    <app-income-modal
      [isOpen]="showIncomeModal"
      (close)="showIncomeModal = false"
      (save)="onIncomeSave($event)">
    </app-income-modal>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    .header {
      text-align: center;
      padding: 60px 20px;
      color: white;
    }

    .header h1 {
      font-size: 48px;
      font-weight: 700;
      margin: 0 0 16px 0;
      letter-spacing: -0.02em;
    }

    .header p {
      font-size: 20px;
      margin: 0;
      opacity: 0.9;
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px 60px;
    }

    .button-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .action-btn {
      background: white;
      border: none;
      border-radius: 16px;
      padding: 24px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      min-height: 80px;
    }

    .action-btn:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .expense-btn {
      color: #DC2626;
    }

    .income-btn {
      color: #059669;
    }

    .records-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 32px;
    }

    .records-section {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    .records-section h3 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 20px 0;
      color: #374151;
    }

    .record-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .record-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-radius: 12px;
      transition: all 0.2s ease;
    }

    .expense-item {
      background: #FEF2F2;
      border-left: 4px solid #DC2626;
    }

    .income-item {
      background: #F0FDF4;
      border-left: 4px solid #059669;
    }

    .record-info h4 {
      margin: 0 0 4px 0;
      font-weight: 600;
      color: #374151;
    }

    .category {
      font-size: 14px;
      color: #6B7280;
      text-transform: capitalize;
      margin-right: 12px;
    }

    .date {
      font-size: 14px;
      color: #6B7280;
    }

    .record-amount {
      font-size: 18px;
      font-weight: 700;
    }

    .expense-amount {
      color: #DC2626;
    }

    .income-amount {
      color: #059669;
    }

    @media (max-width: 768px) {
      .header h1 {
        font-size: 32px;
      }

      .header p {
        font-size: 18px;
      }

      .button-container {
        grid-template-columns: 1fr;
      }

      .records-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class App {
  showExpenseModal = false;
  showIncomeModal = false;
  
  expenses: any[] = [];
  incomes: any[] = [];

  onExpenseSave(expense: any) {
    this.expenses.unshift(expense);
    console.log('Expense saved:', expense);
  }

  onIncomeSave(income: any) {
    this.incomes.unshift(income);
    console.log('Income saved:', income);
  }
}

bootstrapApplication(App);