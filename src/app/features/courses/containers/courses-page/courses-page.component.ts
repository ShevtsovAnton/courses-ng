import { Component, OnInit } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { CoursesItemModel } from '../../models/courses-item.model';
import { CoursesService } from '../../services/courses.service';
import { AddEditCourseService } from 'src/app/features/add-edit-course/services/add-edit-course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
  providers: [LowerCasePipe]
})

export class CoursesPageComponent implements OnInit {
  coursesList: CoursesItemModel[];
  noDataMessage = 'No Data, feel free to add new course';
  isModalOpen: boolean;
  courseToBeDeleted: CoursesItemModel;

  constructor(private lowerCase: LowerCasePipe,
              private coursesService: CoursesService,
              private addEditCourseService: AddEditCourseService
    ) {}

  ngOnInit() {
    this.coursesList = this.coursesService.getList();
  }

  private toLowerCase(item: string): string {
    return this.lowerCase.transform(item);
  }

  delete(course: CoursesItemModel): void {
    this.coursesService.remove(course);
    this.coursesList = this.coursesService.getList();
  }

  edit(): void {
    this.addEditCourseService.openAddEditCoursePage();
  }

  search(searchQuery: string): void {
    const requestedTitle = this.toLowerCase(searchQuery.trim());
    if (!requestedTitle) {
      this.coursesList = this.coursesService.getList();
      return;
    }

    const filteredList = this.coursesList.filter( course => {
      const title = this.toLowerCase(course.title.trim());
      return title.indexOf(requestedTitle) !== -1;
    });

    this.coursesList = [...filteredList];
  }

  openModal(course: CoursesItemModel): void {
    this.courseToBeDeleted = course;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleModalResponse(event: boolean) {
    if (event) {
      this.delete(this.courseToBeDeleted);
    }
    this.closeModal();
  }
}
