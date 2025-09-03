import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserService } from '../../services/user.service';
import { User, CreateUserRequest, UpdateUserRequest } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  template: `
    <div class="users-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Users Management</mat-card-title>
          <mat-card-subtitle>Manage user accounts</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="openCreateDialog()">
              <mat-icon>add</mat-icon>
              Add User
            </button>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="users" matSort>
              <ng-container matColumnDef="username">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Username</th>
                <td mat-cell *matCellDef="let user">{{ user.username }}</td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
                <td mat-cell *matCellDef="let user">{{ user.email }}</td>
              </ng-container>

              <ng-container matColumnDef="firstName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>First Name</th>
                <td mat-cell *matCellDef="let user">{{ user.firstName }}</td>
              </ng-container>

              <ng-container matColumnDef="lastName">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Name</th>
                <td mat-cell *matCellDef="let user">{{ user.lastName }}</td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let user">
                  <mat-chip [color]="user.isActive ? 'accent' : 'warn'" selected>
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let user">
                  <button mat-icon-button color="primary" (click)="openEditDialog(user)" matTooltip="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deleteUser(user._id)" matTooltip="Delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [length]="totalUsers" [pageSize]="pageSize" [pageSizeOptions]="[5, 10, 25, 50]" (page)="onPageChange($event)"></mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Create/Edit Dialog -->
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ isEditing ? 'Edit User' : 'Create User' }}</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" required>
            <mat-error *ngIf="userForm.get('username')?.hasError('required')">Username is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" required>
            <mat-error *ngIf="userForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="userForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width" *ngIf="!isEditing">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password" required>
            <mat-error *ngIf="userForm.get('password')?.hasError('required')">Password is required</mat-error>
            <mat-error *ngIf="userForm.get('password')?.hasError('minlength')">Password must be at least 6 characters</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>First Name</mat-label>
            <input matInput formControlName="firstName" required>
            <mat-error *ngIf="userForm.get('firstName')?.hasError('required')">First name is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Last Name</mat-label>
            <input matInput formControlName="lastName" required>
            <mat-error *ngIf="userForm.get('lastName')?.hasError('required')">Last name is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width" *ngIf="isEditing">
            <mat-label>Status</mat-label>
            <mat-select formControlName="isActive">
              <mat-option [value]="true">Active</mat-option>
              <mat-option [value]="false">Inactive</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="closeDialog()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="userForm.invalid">
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 20px;
    }

    .actions {
      margin-bottom: 20px;
    }

    .table-container {
      overflow-x: auto;
    }

    table {
      width: 100%;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .dialog-container {
      padding: 20px;
    }

    mat-dialog-content {
      min-width: 400px;
    }

    @media (max-width: 768px) {
      mat-dialog-content {
        min-width: 300px;
      }
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['username', 'email', 'firstName', 'lastName', 'status', 'actions'];
  totalUsers = 0;
  pageSize = 10;
  currentPage = 0;
  userForm: FormGroup;
  isEditing = false;
  editingUserId: string | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.totalUsers = users.length;
      },
      error: (error) => {
        this.showMessage('Error loading users', 'error');
      }
    });
  }

  openCreateDialog(): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset({ isActive: true });
    this.userForm.get('password')?.enable();
  }

  openEditDialog(user: User): void {
    this.isEditing = true;
    this.editingUserId = user._id;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive
    });
    this.userForm.get('password')?.disable();
  }

  closeDialog(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.editingUserId = null;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.isEditing && this.editingUserId) {
        const updateData: UpdateUserRequest = this.userForm.value;
        delete updateData.password;
        
        this.userService.updateUser(this.editingUserId, updateData).subscribe({
          next: () => {
            this.showMessage('User updated successfully', 'success');
            this.loadUsers();
            this.closeDialog();
          },
          error: (error) => {
            this.showMessage('Error updating user', 'error');
          }
        });
      } else {
        const createData: CreateUserRequest = this.userForm.value;
        this.userService.createUser(createData).subscribe({
          next: () => {
            this.showMessage('User created successfully', 'success');
            this.loadUsers();
            this.closeDialog();
          },
          error: (error) => {
            this.showMessage('Error creating user', 'error');
          }
        });
      }
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.showMessage('User deleted successfully', 'success');
          this.loadUsers();
        },
        error: (error) => {
          this.showMessage('Error deleting user', 'error');
        }
      });
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}
