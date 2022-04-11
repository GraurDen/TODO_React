import './App.css';
import Header from './components/header/Header.jsx';
import Add_task from './components/add_task/AddTask.jsx';
import Options from './components/options/Options.jsx';
import TodoItem from './components/todo_item/TodoItem.jsx';
import Pagination from './components/pagination/Pagination.jsx';

function App() {
    return (
        <div class='container'>
            <Header />

            {/* Content */}
            <div class='todo'>
                <Add_task />

                <Options />

                <div class='todo__items'>
                    <TodoItem />
                    <TodoItem />
                    <TodoItem />
                </div>

                <Pagination />
            </div>
        </div>
    );
}

export default App;
