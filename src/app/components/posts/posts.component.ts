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
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post, CreatePostRequest, UpdatePostRequest } from '../../models/post.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-posts',
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
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  template: `
    <div class="posts-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Posts Management</mat-card-title>
          <mat-card-subtitle>Manage blog posts</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="openCreateDialog()">
              <mat-icon>add</mat-icon>
              Add Post
            </button>
          </div>

          <div class="table-container">
            <table mat-table [dataSource]="posts" matSort>
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Title</th>
                <td mat-cell *matCellDef="let post">{{ post.title }}</td>
              </ng-container>

              <ng-container matColumnDef="author">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Author</th>
                <td mat-cell *matCellDef="let post">{{ post.author.firstName }} {{ post.author.lastName }}</td>
              </ng-container>

              <ng-container matColumnDef="tags">
                <th mat-header-cell *matHeaderCellDef>Tags</th>
                <td mat-cell *matCellDef="let post">
                  <mat-chip *ngFor="let tag of post.tags" color="primary" selected>
                    {{ tag }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let post">
                  <mat-chip [color]="post.isPublished ? 'accent' : 'warn'" selected>
                    {{ post.isPublished ? 'Published' : 'Draft' }}
                  </mat-chip>
                </td>
              </ng-container>

              <ng-container matColumnDef="createdAt">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Created</th>
                <td mat-cell *matCellDef="let post">{{ post.createdAt | date:'short' }}</td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let post">
                  <button mat-icon-button color="primary" (click)="openEditDialog(post)" matTooltip="Edit">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="deletePost(post._id)" matTooltip="Delete">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [length]="totalPosts" [pageSize]="pageSize" [pageSizeOptions]="[5, 10, 25, 50]" (page)="onPageChange($event)"></mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Create/Edit Dialog -->
    <div class="dialog-container">
      <h2 mat-dialog-title>{{ isEditing ? 'Edit Post' : 'Create Post' }}</h2>
      <form [formGroup]="postForm" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" required>
            <mat-error *ngIf="postForm.get('title')?.hasError('required')">Title is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Content</mat-label>
            <textarea matInput formControlName="content" rows="6" required></textarea>
            <mat-error *ngIf="postForm.get('content')?.hasError('required')">Content is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Author</mat-label>
            <mat-select formControlName="author" required>
              <mat-option *ngFor="let user of users" [value]="user._id">
                {{ user.firstName }} {{ user.lastName }} ({{ user.username }})
              </mat-option>
            </mat-select>
            <mat-error *ngIf="postForm.get('author')?.hasError('required')">Author is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Tags (comma-separated)</mat-label>
            <input matInput formControlName="tagsString" placeholder="e.g., technology, angular, web">
          </mat-form-field>

          <div class="checkbox-container">
            <mat-checkbox formControlName="isPublished">
              Publish immediately
            </mat-checkbox>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="closeDialog()">Cancel</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="postForm.invalid">
            {{ isEditing ? 'Update' : 'Create' }}
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [`
    .posts-container {
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

    .checkbox-container {
      margin-bottom: 16px;
    }

    .dialog-container {
      padding: 20px;
    }

    mat-dialog-content {
      min-width: 500px;
    }

    @media (max-width: 768px) {
      mat-dialog-content {
        min-width: 300px;
      }
    }
  `]
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  displayedColumns: string[] = ['title', 'author', 'tags', 'status', 'createdAt', 'actions'];
  totalPosts = 0;
  pageSize = 10;
  currentPage = 0;
  postForm: FormGroup;
  isEditing = false;
  editingPostId: string | null = null;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      tagsString: [''],
      isPublished: [false]
    });
  }

  ngOnInit(): void {
    this.loadPosts();
    this.loadUsers();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.totalPosts = posts.length;
      },
      error: (error) => {
        this.showMessage('Error loading posts', 'error');
      }
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.showMessage('Error loading users', 'error');
      }
    });
  }

  openCreateDialog(): void {
    this.isEditing = false;
    this.editingPostId = null;
    this.postForm.reset({ isPublished: false });
  }

  openEditDialog(post: Post): void {
    this.isEditing = true;
    this.editingPostId = post._id;
    this.postForm.patchValue({
      title: post.title,
      content: post.content,
      author: post.author._id,
      tagsString: post.tags.join(', '),
      isPublished: post.isPublished
    });
  }

  closeDialog(): void {
    this.postForm.reset();
    this.isEditing = false;
    this.editingPostId = null;
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;
      const tags = formValue.tagsString ? formValue.tagsString.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [];

      if (this.isEditing && this.editingPostId) {
        const updateData: UpdatePostRequest = {
          title: formValue.title,
          content: formValue.content,
          tags: tags,
          isPublished: formValue.isPublished
        };
        
        this.postService.updatePost(this.editingPostId, updateData).subscribe({
          next: () => {
            this.showMessage('Post updated successfully', 'success');
            this.loadPosts();
            this.closeDialog();
          },
          error: (error) => {
            this.showMessage('Error updating post', 'error');
          }
        });
      } else {
        const createData: CreatePostRequest = {
          title: formValue.title,
          content: formValue.content,
          author: formValue.author,
          tags: tags,
          isPublished: formValue.isPublished
        };
        
        this.postService.createPost(createData).subscribe({
          next: () => {
            this.showMessage('Post created successfully', 'success');
            this.loadPosts();
            this.closeDialog();
          },
          error: (error) => {
            this.showMessage('Error creating post', 'error');
          }
        });
      }
    }
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.showMessage('Post deleted successfully', 'success');
          this.loadPosts();
        },
        error: (error) => {
          this.showMessage('Error deleting post', 'error');
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
