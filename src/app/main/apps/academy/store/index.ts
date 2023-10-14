import { SlicesType } from 'app/store/lazyWithSlices';
import course from './courseSlice';
import courses from './coursesSlice';
import categories from './categoriesSlice';

/**
 * The Academy App slices.
 */
const slices = [categories, courses, course] as SlicesType;

export default slices;
