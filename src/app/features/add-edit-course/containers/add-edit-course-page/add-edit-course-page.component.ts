import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CoursesItemModel } from 'src/app/features/courses/models/courses-item.model';
import { takeUntil, catchError, filter, tap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AppRoutes } from 'src/app/shared/enums/routes.enum';
import { AppState } from 'src/app/core/store/app-store.model';
import { Store } from '@ngrx/store';
import { getCourseRequest, createCourse, updateCourse } from 'src/app/features/courses/store/courses.actions';

@Component({
  selector: 'app-add-edit-course-page',
  templateUrl: './add-edit-course-page.component.html',
  styleUrls: ['./add-edit-course-page.component.scss']
})
export class AddEditCoursePageComponent implements OnInit, OnDestroy {
  course: CoursesItemModel;
  isCourseNew = true;
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        filter((params: Params) => params.id !== undefined),
        tap((params: Params) => {
            this.store.dispatch(getCourseRequest({ id: params.id }));
        }),
        catchError(error => of(error)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.isCourseNew = false);
    this.store.select(store => store.courses.selectedCourse)
        .pipe(takeUntil(this.destroy$))
        .subscribe((course: CoursesItemModel) => this.course = course);
  }

  save(): void {
    if (this.isCourseNew) {
      this.store.dispatch(createCourse({ course: this.course }));
    } else {
      this.store.dispatch(updateCourse( {course: this.course }));
    }
  }

  cancel(): void {
    this.router.navigate([AppRoutes.Courses]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    }
}
