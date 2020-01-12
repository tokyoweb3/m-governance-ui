import React, { useState } from 'react'
import { Menu, MenuItemProps } from 'semantic-ui-react'

export default function Home() {
  const Paragraph = () => (
    <p>
      {[
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
        'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
        'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
        'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
        'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
        'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
        'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
        'accumsan porttitor, facilisis luctus, metus',
      ].join('')}
    </p>
  )
  const text = {
    fontSize: '15px',
    lineHeight: '1.8',
  }

    return (
      <>
        <h1><code>M-Governance Tutorial</code></h1>
        <h2><code>Blockchain-based decision making platform</code></h2>
        <p style={text}>
        M-Governanceはブロックチェーン上での意思集約をもっと簡単に行うためのプラットフォームです。
        現状のブロックチェーンの意思決定は結果が決めた事の実行に直結せず、最終的な決定は中央主体に委ねられています。<br/>
        MーGovernanceでは意思決定結果はPolkadotを通すことで、他のブロックチェーンのスマートコントラクトやランタイムイベントを自律的にトリガーすることが可能です。</p>
        <p style={text}>
        さらに最新のクアドラティック投票やロック投票なども提供しており、意思決定事項にとってハイパフォーマンスなモデルやツールを採用できます。
        CA(Central Authority)により署名された電子証明書を使ってPermissionedな投票を行うことも可能です。<br/>

        このチュートリアルでは投票の作成、投票、CAの登録などを学べます。</p>
      </>
    );
}
