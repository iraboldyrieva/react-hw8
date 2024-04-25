import Checkbox from "../Checkbox/Checkbox";
import styles from "./Task.module.css";

export default function Task({ task, onToggleDone, onDelete }) {
  return (
    <li className={styles.items} key={task.id}>
      <span
        style={{
          textDecoration: task.done ? "line-through" : "none",
          flexGrow: 1,
        }}
      >
        {task.name}
      </span>
      <Checkbox isChecked={task.done} onChange={() => onToggleDone(task.id)} />
      <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
        X
      </button>
    </li>
  );
}
