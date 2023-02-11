import { useState } from 'react';

export default function Examples() {
  const [expand, setExpand] = useState(false);

  return (
    <div un-flex="~ col">
      <div className="i-ph:airplane-in-flight-bold" un-w="10" un-h="10" />
      <div className="i-ant-design:aliyun-outlined w-20 h-20" />
      <button
        bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
        un-text="sm white"
        un-font="mono light"
        un-p="y-2 x-4"
        un-border="2 rounded blue-200"
      >
        Button
      </button>
      <div>
        <div className="w-12 h-12" />
        <button>button</button>
      </div>

      <div className="bg-green-300 w-20 h-20 hover:w-40 transition-all duration-300" />

      <div>
        <div onClick={() => setExpand(!expand)}>点击展开</div>
        <div
          className="bg-yellow-300 w-20 h-20 hover:w-40 transition-all duration-300"
          style={{ width: expand ? 300 : 50 }}
        />
      </div>
    </div>
  );
}
