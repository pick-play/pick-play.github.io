import Link from "next/link";

export default function CompoundInterestPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        복리의 마법 - 10년 후 내 돈은 얼마가 될까?
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.12</time>
        <span>·</span>
        <span>읽기 8분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          알베르트 아인슈타인이 &quot;복리는 세계 8대 불가사의이며, 이해하는 자는 벌고 이해 못 하는 자는 낸다&quot;라고 말했다는 이야기가 있습니다.
          사실 여부를 떠나, 이 말은 복리의 힘을 정확하게 표현합니다.
          매달 조금씩 저축하는 것이 왜 중요한지, 왜 빨리 시작할수록 유리한지, 복리의 원리를 통해 알아보겠습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">단리 vs 복리 - 무엇이 다른가?</h2>
        <p className="mb-4 leading-relaxed">
          <strong>단리(Simple Interest)</strong>는 원금에만 이자가 붙는 방식입니다.
          100만 원을 연 10%로 3년 동안 단리로 투자하면, 매년 10만 원씩, 3년 후에 130만 원이 됩니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>복리(Compound Interest)</strong>는 이자에도 이자가 붙는 방식입니다.
          같은 조건으로 복리로 투자하면 이렇게 됩니다:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>1년 후: 100만 원 × 1.1 = <strong>110만 원</strong></li>
          <li>2년 후: 110만 원 × 1.1 = <strong>121만 원</strong></li>
          <li>3년 후: 121만 원 × 1.1 = <strong>133.1만 원</strong></li>
        </ul>
        <p className="mb-4 leading-relaxed">
          3년 후 차이는 3.1만 원으로 크지 않아 보입니다. 하지만 기간이 길어질수록 이 차이는 폭발적으로 커집니다.
          30년 후를 비교해보면, 단리는 400만 원, 복리는 약 1,745만 원이 됩니다. 무려 4배 이상의 차이입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">복리의 공식</h2>
        <p className="mb-4 leading-relaxed">
          복리를 계산하는 공식은 다음과 같습니다:
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 font-mono text-sm">
          <p>A = P × (1 + r/n)^(n×t)</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-sans text-xs">
            A = 최종 금액, P = 원금, r = 연이율(소수), n = 연간 복리 횟수, t = 기간(년)
          </p>
        </div>
        <p className="mb-4 leading-relaxed">
          예를 들어 원금 1,000만 원을 연 5%, 월복리(n=12)로 10년 투자하면:
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 font-mono text-sm">
          <p>A = 1,000만 × (1 + 0.05/12)^(12×10)</p>
          <p>A = 1,000만 × (1.004167)^120</p>
          <p>A ≈ 1,000만 × 1.6470</p>
          <p>A ≈ <strong>1,647만 원</strong></p>
        </div>
        <p className="mb-4 leading-relaxed">
          10년 동안 원금만 넣어두었을 뿐인데, 647만 원의 이자가 발생했습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">72법칙 - 내 돈이 두 배 되는 시간</h2>
        <p className="mb-4 leading-relaxed">
          <strong>72법칙</strong>은 복리로 투자했을 때 원금이 두 배가 되는 기간을 빠르게 계산하는 방법입니다.
          공식은 간단합니다: <strong>72 ÷ 연이율 = 두 배가 되는 기간(년)</strong>
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>연 3% (은행 정기예금): 72 ÷ 3 = <strong>24년</strong></li>
          <li>연 6% (채권 펀드): 72 ÷ 6 = <strong>12년</strong></li>
          <li>연 9% (주식 인덱스펀드 역사적 평균): 72 ÷ 9 = <strong>8년</strong></li>
          <li>연 12% (고위험 투자): 72 ÷ 12 = <strong>6년</strong></li>
        </ul>
        <p className="mb-4 leading-relaxed">
          연 9%로 투자하면 8년마다 돈이 두 배가 됩니다. 25세에 1,000만 원을 투자하면 33세에 2,000만 원, 41세에 4,000만 원, 49세에 8,000만 원, 57세에 1억 6,000만 원이 됩니다.
          단 1,000만 원의 씨앗이 30년 후에는 16배로 자라는 것입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">시작 시기가 얼마나 중요한가? - 두 투자자 이야기</h2>
        <p className="mb-4 leading-relaxed">
          복리에서 가장 중요한 변수는 <strong>시간</strong>입니다. 다음 두 투자자를 비교해봅시다.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 mb-4">
          <p className="font-semibold mb-2">투자자 A - 일찍 시작한 사람</p>
          <ul className="text-sm space-y-1">
            <li>25세부터 35세까지 10년간 매월 30만 원 투자</li>
            <li>35세 이후에는 추가 투자 없이 유지</li>
            <li>연 7% 복리 가정</li>
            <li>총 투자금: 3,600만 원</li>
            <li>65세 기준 자산: <strong>약 4억 7,000만 원</strong></li>
          </ul>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5 mb-4">
          <p className="font-semibold mb-2">투자자 B - 늦게 시작한 사람</p>
          <ul className="text-sm space-y-1">
            <li>35세부터 65세까지 30년간 매월 30만 원 투자</li>
            <li>연 7% 복리 가정</li>
            <li>총 투자금: 1억 800만 원</li>
            <li>65세 기준 자산: <strong>약 3억 4,000만 원</strong></li>
          </ul>
        </div>
        <p className="mb-4 leading-relaxed">
          놀랍게도 A가 B보다 투자금은 3분의 1인데 최종 자산은 더 많습니다.
          10년을 먼저 시작했다는 것만으로 이런 차이가 납니다. 이것이 복리의 힘입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">적금 vs 투자 - 어떤 선택이 유리할까?</h2>
        <p className="mb-4 leading-relaxed">
          1,000만 원을 30년 동안 운용한다면 어떤 선택이 나을까요?
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>은행 정기예금 (연 3%):</strong> 30년 후 약 2,427만 원</li>
          <li><strong>채권 혼합형 펀드 (연 5%):</strong> 30년 후 약 4,322만 원</li>
          <li><strong>주식 인덱스펀드 (연 8%):</strong> 30년 후 약 1억 93만 원</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          물론 수익률이 높을수록 위험도도 높아집니다. 주식 투자는 단기적으로 큰 손실을 볼 수 있습니다.
          하지만 역사적으로 미국 S&P 500 지수는 30년 이상 장기 투자 시 손실을 본 사례가 없습니다.
          분산 투자와 장기 투자를 통해 위험을 최소화하는 것이 핵심입니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">복리를 극대화하는 실전 팁</h2>
        <ul className="list-disc pl-6 mb-4 space-y-3">
          <li><strong>지금 당장 시작하세요:</strong> 하루라도 빨리 시작하는 것이 중요합니다. 완벽한 타이밍을 기다리다가 기회를 놓치지 마세요.</li>
          <li><strong>자동이체를 설정하세요:</strong> 월급날 자동으로 적립되도록 설정하면 의지와 상관없이 투자가 이루어집니다.</li>
          <li><strong>세금 혜택 계좌를 활용하세요:</strong> ISA, IRP, 연금저축펀드 등 세금 혜택이 있는 계좌에서 복리 투자를 하면 세금으로 나가는 돈만큼 수익률이 높아집니다.</li>
          <li><strong>비용을 최소화하세요:</strong> 수수료 0.1%의 차이도 30년이 지나면 상당한 금액입니다. 낮은 수수료의 인덱스펀드나 ETF를 선택하세요.</li>
          <li><strong>팔지 마세요:</strong> 시장이 폭락해도 팔지 않는 것이 중요합니다. 복리의 효과는 장기간 유지할 때 나타납니다.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">인플레이션을 고려한 실질 수익률</h2>
        <p className="mb-4 leading-relaxed">
          복리 계산 시 한 가지 함정이 있습니다. 물가 상승(인플레이션)을 고려해야 한다는 것입니다.
          연 3% 예금 이자를 받더라도 물가가 연 3% 오른다면 실질적인 구매력은 그대로입니다.
          한국의 최근 10년 평균 인플레이션율은 약 2~3%였습니다.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>실질 수익률 = 명목 수익률 - 인플레이션율</strong>
        </p>
        <p className="mb-4 leading-relaxed">
          따라서 물가 상승을 이기는 수익률을 목표로 해야 합니다. 은행 예금만으로는 장기적으로 구매력을 유지하기 어렵고,
          어느 정도의 투자 위험을 감수하더라도 더 높은 수익률을 추구하는 것이 장기적으로 유리할 수 있습니다.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-slate-600 dark:text-slate-300">
          &quot;나무를 심기 가장 좋은 때는 20년 전이었고, 두 번째로 좋은 때는 지금이다.&quot; - 중국 속담
        </blockquote>

        <p className="mb-4 leading-relaxed">
          복리 투자에서 가장 중요한 것은 지금 시작하는 것입니다. 완벽한 투자처를 찾느라 시간을 낭비하는 것보다,
          지금 당장 조금이라도 시작하는 것이 훨씬 낫습니다.
          아래의 PickPlay 복리 계산기로 여러분의 목표를 계산해보세요.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/compound-calculator/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 복리 계산기 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          원금, 월 적립액, 이율, 기간을 입력해 최종 수익을 즉시 계산해보세요. 72법칙도 함께 확인할 수 있습니다.
        </p>
      </div>
    </article>
  );
}
