import styles from './index.less';

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>
        Page index
        <h3>
          tailwind
          <div className="flex flex-row h-[50px]">
            content
            <div>123</div>
          </div>
        </h3>
      </h1>
    </div>
  );
}
