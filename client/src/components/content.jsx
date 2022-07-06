import React from 'react';
import AddTask from './add_task/AddTask.jsx';
import Options from './options/Options.jsx';
import TodoItem from './todo_item/TodoItem.jsx';
import Paginate from './pagination/Paginate.jsx';
import style from '../App.module.css';

const Content = (props) => {
    const {
        addTask,
        showUserMessage,
        onOrderBy,
        onSetFilterBy,
        removeTask,
        toggleTask,
        editTask,
        paginate,
        pageSize,
        currentPage,
        totalItemsCount,
        filteredTodos,
    } = props;
    return (
        <div>
            <AddTask addTask={addTask} showUserMessage={showUserMessage} />

            {/* Buttons */}
            <Options onOrderBy={onOrderBy} onSetFilterBy={onSetFilterBy} />

            {/* Items */}
            <div className={style.todo__items}>
                {filteredTodos.map((item) => {
                    return (
                        <TodoItem
                            item={item}
                            key={item.id}
                            removeTask={removeTask}
                            toggleTask={toggleTask}
                            editTask={editTask}
                        />
                    );
                })}
            </div>

            {/* Pagination */}
            <Paginate
                paginate={paginate}
                pageSize={pageSize}
                currentPage={currentPage}
                totalItemsCount={totalItemsCount}
            />
        </div>
    );
};
export default Content;
