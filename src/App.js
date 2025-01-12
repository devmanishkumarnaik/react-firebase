import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './components/Dashboard';
import AddStudent from "./components/AddStudent";
import StudentList from './components/StudentList';
import UpdateStudent from './components/UpdateStudent';
import AddFaculty from './components/AddFaculty';
import FacultyList from './components/FacultyList';
import UpdateFaculty from './components/UpdateFaculty';
import Signup from './components/Signup';
import Login from './components/Login';

const myRouter = createBrowserRouter([
  {path: 'signup', Component: Signup},
  {path: 'login', Component: Login},
  {path: 'dashboard', Component: Dashboard,children:[
    {path: '', Component: StudentList},
    {path: 'addStudent', Component: AddStudent},
    {path: 'studentList', Component: StudentList},
    {path: 'updateStudent', Component: UpdateStudent},
    {path: 'addFaculty', Component: AddFaculty},
    {path: 'facultyList', Component: FacultyList},
    {path: 'updateFaculty', Component: UpdateFaculty}
  ]}
])
function App() {

  return (
    <>
     <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
